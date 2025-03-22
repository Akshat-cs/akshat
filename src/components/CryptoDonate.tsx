"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useRef, useEffect } from "react";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { SiSolana } from "react-icons/si";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import toast from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface CryptoAddress {
  symbol: string;
  address: string;
  network: string;
}

const cryptoAddresses: CryptoAddress[] = [
  {
    symbol: "SOL",
    address: "5sVDFVziSqhKXsPTKKknKnUgmzoxPytGuPtdSfpLQMSB",
    network: "Solana",
  },
];

const SUGGESTED_AMOUNTS = {
  SOL: ["0.1", "0.5", "1"],
};

const SOLANA_RPC_ENDPOINT =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
  "https://api.mainnet-beta.solana.com";

export default function CryptoDonate() {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoAddress | null>(
    null
  );
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const { publicKey, sendTransaction, wallets, wallet, select } = useWallet();

  const solanaConnection = useMemo(
    () =>
      new Connection(SOLANA_RPC_ENDPOINT, {
        commitment: "confirmed",
        wsEndpoint: undefined,
        confirmTransactionInitialTimeout: 60000,
      }),
    []
  );

  // Handle click outside to close modal
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (
        target.closest(".wallet-adapter-modal") ||
        (modalRef.current && modalRef.current.contains(target))
      ) {
        return;
      }
      setSelectedCrypto(null);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatErrorMessage = (error: string): string => {
    if (error.includes("Transaction failed:")) {
      return "Transaction failed - please try again";
    }
    if (error.length > 100) {
      return error.slice(0, 100) + "...";
    }
    return error;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Address copied to clipboard!");
      setTimeout(() => setSelectedCrypto(null), 2000);
    } catch (err) {
      toast.error("Failed to copy address");
      console.error("Failed to copy text: ", err);
    }
  };

  const handleDonate = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const toastId = toast.loading("Processing...");
    setIsProcessing(true);

    try {
      if (!publicKey || !sendTransaction || !selectedCrypto) {
        toast.error("Please connect your Phantom wallet first", {
          id: toastId,
        });
        return;
      }

      console.log("Creating transaction...");
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(selectedCrypto.address),
          lamports: LAMPORTS_PER_SOL * parseFloat(amount),
        })
      );

      const { blockhash } = await solanaConnection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      console.log("Requesting wallet approval...");
      const signature = await sendTransaction(transaction, solanaConnection);
      console.log("✅ Transaction sent! Signature:", signature);

      try {
        console.log("Confirming transaction...");
        toast.loading("Confirming transaction...", { id: toastId });

        const checkTransaction = async () => {
          const response = await solanaConnection.getSignatureStatus(signature);
          console.log("Transaction status:", response);

          if (response?.value?.err) {
            throw new Error(
              "Transaction failed - please check Solscan for details"
            );
          }

          return (
            response?.value?.confirmationStatus === "confirmed" ||
            response?.value?.confirmationStatus === "finalized"
          );
        };

        let confirmed = false;
        const startTime = Date.now();
        const timeout = 30000;

        while (!confirmed && Date.now() - startTime < timeout) {
          try {
            confirmed = await checkTransaction();
            if (!confirmed) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
            }
          } catch (error) {
            throw error;
          }
        }

        if (!confirmed) {
          throw new Error(
            "Transaction confirmation timed out - please check Solscan"
          );
        }

        const finalStatus = await solanaConnection.getTransaction(signature, {
          maxSupportedTransactionVersion: 0,
        });

        if (!finalStatus || finalStatus.meta?.err) {
          throw new Error(
            "Transaction failed - please check Solscan for details"
          );
        }

        console.log("✅ Transaction confirmed successfully!");
        setAmount("");
        setSelectedCrypto(null);
        toast.success("Thank you for your donation! 🎉", {
          id: toastId,
          duration: 5000,
          icon: "☕️",
        });

        toast.success(
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <SiSolana className="w-4 h-4 text-purple-400" />
              <span className="font-medium">Transaction Confirmed!</span>
            </div>
            <a
              href={`https://solscan.io/tx/${signature}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-purple-900/30 px-3 py-1.5 rounded-lg hover:bg-purple-900/50 transition-colors flex items-center gap-2 group"
            >
              <span className="font-mono">
                {signature.slice(0, 6)}...{signature.slice(-4)}
              </span>
              <span className="text-purple-400 group-hover:text-purple-300">
                ↗
              </span>
            </a>
          </div>,
          { duration: 5000 }
        );
      } catch (confirmError: unknown) {
        console.error("❌ Confirmation error:", confirmError);
        const errorMessage =
          confirmError instanceof Error
            ? confirmError.message
            : "Transaction failed";
        toast.error(formatErrorMessage(errorMessage), {
          id: toastId,
          duration: 4000,
        });
        toast.error(
          <div className="flex flex-col gap-2">
            <span>Check transaction status:</span>
            <a
              href={`https://solscan.io/tx/${signature}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-red-900/30 px-3 py-1.5 rounded-lg hover:bg-red-900/50 transition-colors flex items-center gap-2 group"
            >
              <span className="font-mono">
                {signature.slice(0, 6)}...{signature.slice(-4)}
              </span>
              <span className="text-red-400 group-hover:text-red-300">↗</span>
            </a>
          </div>,
          { duration: 10000 }
        );
      }
    } catch (error: unknown) {
      console.error("❌ Transaction error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to send transaction. Please try again.";
      toast.error(formatErrorMessage(errorMessage), {
        id: toastId,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Function to handle wallet connection
  const handleConnectWallet = async () => {
    const phantomWallet = wallets.find((w) => w.adapter.name === "Phantom");
    if (!phantomWallet) {
      toast.error("Please install Phantom wallet 👻");
      return;
    }

    try {
      console.log("Found Phantom wallet, attempting connection...");
      await select(phantomWallet.adapter.name);
      await phantomWallet.adapter.connect();
      await new Promise((resolve) => setTimeout(resolve, 300));

      if (publicKey) {
        console.log("Wallet connected successfully:", publicKey.toString());
        toast.success("Phantom wallet connected! 👻");
      }
    } catch (error: unknown) {
      console.error("Connection error:", error);
      try {
        if (phantomWallet.adapter.connected) {
          await phantomWallet.adapter.disconnect();
        }
      } catch (e: unknown) {
        console.error("Error during cleanup:", e);
      }
      const errorMessage =
        error instanceof Error ? error.message : "Failed to connect wallet";
      toast.error(formatErrorMessage(errorMessage));
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSelectedCrypto(cryptoAddresses[0])}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors text-white"
      >
        <CurrencyDollarIcon className="h-5 w-5" />
        Buy me a crypto coffee
      </motion.button>

      <AnimatePresence>
        {selectedCrypto && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
              onClick={() => setSelectedCrypto(null)}
            />

            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[9999]"
            >
              <div className="relative mx-4">
                <div className="relative rounded-2xl bg-[#0D0D0F] border border-purple-500/20 shadow-xl">
                  <button
                    onClick={() => setSelectedCrypto(null)}
                    className="absolute right-4 top-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-purple-600/20 transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>

                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-center mb-2">
                      Buy me a crypto coffee ☕️
                    </h2>
                    <p className="text-gray-400 text-center mb-6">
                      Send SOL via Phantom wallet
                    </p>

                    <div className="flex justify-center mb-8">
                      <div className="flex flex-col items-center justify-center p-4 rounded-xl border bg-purple-600/20 border-purple-500">
                        <SiSolana className="text-3xl mb-2" />
                        <span className="text-xl font-bold">SOL</span>
                        <span className="text-sm text-gray-400">Solana</span>
                      </div>
                    </div>

                    <div className="bg-purple-900/20 rounded-xl p-4 mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Network</span>
                        <span className="text-sm font-medium">
                          {selectedCrypto.network}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Address</span>
                        <button
                          onClick={() =>
                            copyToClipboard(selectedCrypto.address)
                          }
                          className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          {selectedCrypto.address.slice(0, 6)}...
                          {selectedCrypto.address.slice(-4)} Copy
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {SUGGESTED_AMOUNTS.SOL.map((suggestedAmount) => (
                        <button
                          key={suggestedAmount}
                          onClick={() => setAmount(suggestedAmount)}
                          className={`p-3 text-center rounded-xl border transition-all ${
                            suggestedAmount === amount
                              ? "bg-purple-600/20 border-purple-500"
                              : "bg-purple-900/20 border-purple-500/20 hover:border-purple-500/40"
                          }`}
                        >
                          {suggestedAmount} SOL
                        </button>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter SOL amount"
                        className="w-full bg-purple-900/10 border border-purple-500/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                        min="0"
                        step="0.000000000000000001"
                      />

                      <div className="relative">
                        {publicKey && (
                          <div className="flex items-center justify-center gap-2 text-sm">
                            <span className="text-purple-400">
                              {`${publicKey
                                .toString()
                                .slice(0, 4)}...${publicKey
                                .toString()
                                .slice(-4)}`}
                            </span>
                            <button
                              onClick={() => {
                                if (wallet?.adapter?.disconnect) {
                                  wallet.adapter.disconnect();
                                  toast.success("Wallet disconnected");
                                }
                              }}
                              className="text-red-400 hover:text-red-300 transition-colors ml-2"
                            >
                              Disconnect
                            </button>
                          </div>
                        )}

                        <button
                          onClick={
                            publicKey ? handleDonate : handleConnectWallet
                          }
                          disabled={
                            publicKey
                              ? isProcessing ||
                                !amount ||
                                isNaN(parseFloat(amount)) ||
                                parseFloat(amount) <= 0
                              : false
                          }
                          className={`w-full py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                            publicKey &&
                            (isProcessing ||
                              !amount ||
                              isNaN(parseFloat(amount)) ||
                              parseFloat(amount) <= 0)
                              ? "bg-purple-900/30 text-gray-400 cursor-not-allowed"
                              : "bg-purple-600 text-white hover:bg-purple-700"
                          }`}
                        >
                          {isProcessing
                            ? "Processing..."
                            : publicKey
                            ? "Send SOL"
                            : "Connect Phantom"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
