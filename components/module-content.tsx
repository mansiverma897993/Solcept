"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, CheckCircle2, Code2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const moduleData = {
  intro: {
    title: "Solana Fundamentals",
    color: "#9945FF",
    description: "Master the core concepts of Solana blockchain",
    sections: [
      {
        title: "What is Solana?",
        content: `Solana is a high-speed, low-cost blockchain that enables fast, secure, scalable transactions. 
        It uses Proof of History (PoH) to timestamp transactions before they enter the network, allowing validators 
        to parallelize transaction processing. Solana can handle over 65,000 transactions per second (TPS) with 
        confirmation times of just 400 milliseconds.`,
      },
      {
        title: "Accounts Model",
        content: `Unlike Ethereum's state-based model, Solana uses an accounts model where each account is a separate 
        on-chain data structure that can hold SOL tokens or data. Accounts are owned by programs and can only be modified 
        by their owning programs. This unique model allows Solana to process thousands of transactions in parallel.`,
      },
      {
        title: "Transactions & Instructions",
        content: `A Solana transaction consists of instructions that specify which accounts to read/write and which 
        program to execute. Each instruction is atomic - either it succeeds or the entire transaction fails. 
        Multiple instructions can be packed into a single transaction, improving throughput.`,
      },
      {
        title: "Program Derived Addresses (PDAs)",
        content: `PDAs are addresses derived from a program ID and seeds, allowing programs to sign transactions on behalf 
        of accounts they control. This is crucial for creating decentralized applications that need to hold assets 
        or data without requiring a traditional private key.`,
      },
    ],
  },
  rust: {
    title: "Rust for Solana",
    color: "#14F195",
    description: "Learn Rust fundamentals for Solana development",
    sections: [
      {
        title: "Ownership & Borrowing",
        content: `Rust's ownership system is a key feature that makes it memory-safe without garbage collection. 
        Every value has an owner, and when the owner goes out of scope, the value is dropped. Borrowing allows 
        temporary access to values without taking ownership. Understanding this is essential for writing efficient Solana programs.`,
      },
      {
        title: "Traits & Implementations",
        content: `Traits in Rust define shared behavior that multiple types can implement. They're similar to interfaces 
        in other languages. For Solana development, traits are used extensively in the anchor framework for defining 
        account constraints and transaction handlers.`,
      },
      {
        title: "Memory Safety & Safety",
        content: `Rust prevents common memory issues like null pointer dereferences, buffer overflows, and data races 
        at compile time. This makes Solana programs inherently more secure. The borrow checker enforces these rules, 
        catching bugs before they reach production.`,
      },
      {
        title: "Error Handling",
        content: `Rust uses Result<T, E> for error handling instead of exceptions. This forces developers to think 
        about error cases explicitly. In Solana programs, custom error types are used to provide meaningful error messages 
        when transactions fail.`,
      },
      {
        title: "Macros & Procedural Macros",
        content: `Macros are a way to write code that generates other code. Anchor uses procedural macros extensively 
        to reduce boilerplate. Understanding how these macros work helps you write cleaner Solana programs.`,
      },
    ],
  },
  anchor: {
    title: "Anchor Framework",
    color: "#19FB9B",
    description: "Master the Anchor framework for Solana development",
    sections: [
      {
        title: "What is Anchor?",
        content: `Anchor is a framework for writing Solana programs using Rust. It provides macros and utilities that 
        reduce boilerplate code, making development faster and safer. Anchor programs are easier to audit and test than raw Solana programs.`,
      },
      {
        title: "Account Constraints & Validation",
        content: `Anchor's #[account] macro automatically generates serialization/deserialization code and allows you to 
        specify constraints for accounts. These constraints are validated before your instruction handler runs, preventing 
        common security vulnerabilities like re-entrancy attacks.`,
      },
      {
        title: "Cross-Program Invocation (CPI)",
        content: `CPIs allow your program to call other programs on Solana. Anchor simplifies CPI by providing helper 
        functions and automatic account validation. This is essential for building composable DeFi protocols.`,
      },
      {
        title: "Program Derived Addresses (PDAs)",
        content: `Anchor provides convenient macros for working with PDAs. The #[derive(Accounts)] macro can automatically 
        derive PDAs based on seeds you specify, making it easier to build secure account structures.`,
      },
      {
        title: "Testing & Debugging",
        content: `Anchor includes built-in testing utilities that let you write tests in Rust. You can use the anchor test 
        command to run tests against a local validator, making development fast and iterative.`,
      },
    ],
  },
  advanced: {
    title: "Advanced Concepts",
    color: "#FF6EC7",
    description: "Explore advanced Solana development techniques",
    sections: [
      {
        title: "State Compression",
        content: `State compression uses Merkle trees to reduce the amount of data stored on-chain. This is crucial for 
        applications that need to store large amounts of data cheaply. Metaplex's Bubblegum is a prime example of state compression in action.`,
      },
      {
        title: "Token Extensions",
        content: `Token Extensions (formerly Token-2022) allow you to add custom logic to token transfers. Features like 
        transfer hooks, fees, and interest-bearing tokens can be implemented without modifying the core token program.`,
      },
      {
        title: "Versioned Transactions",
        content: `Versioned transactions support lookup tables (LUTs) to include more accounts in a single transaction. 
        This increases composability and allows more complex transactions to fit within Solana's transaction size limits.`,
      },
      {
        title: "Program Buffer & Upgrades",
        content: `Solana programs can be upgradeable if they're initialized with an upgrade authority. This allows you to 
        fix bugs or add features after deployment. Understanding upgrade mechanics is important for production programs.`,
      },
      {
        title: "Custom Serialization",
        content: `While Anchor handles most serialization, sometimes you need custom serialization for performance or special 
        use cases. Understanding borsh and custom serialization patterns helps optimize program performance.`,
      },
    ],
  },
  security: {
    title: "Security & Auditing",
    color: "#FFA500",
    description: "Learn security best practices for Solana programs",
    sections: [
      {
        title: "Common Vulnerabilities",
        content: `Solana programs have unique security considerations. Common vulnerabilities include missing signer checks, 
        unchecked accounts, re-entrancy through CPIs, and arithmetic overflows. Understanding these helps you write secure code from the start.`,
      },
      {
        title: "Signer & Owner Verification",
        content: `Always verify that the expected accounts have signed the transaction and that accounts are owned by the 
        correct program. Failing to do this can allow attackers to manipulate program state.`,
      },
      {
        title: "Account Validation Best Practices",
        content: `Validate that accounts have the correct owner, are not read-only when they should be writable, and contain 
        the expected data. Anchor's constraint system helps with this, but manual verification is sometimes necessary.`,
      },
      {
        title: "Arithmetic Safety",
        content: `Always use checked arithmetic operations (checked_add, checked_mul, etc.) instead of standard operations 
        to prevent overflows/underflows. Solana uses Rust's panic on overflow in debug mode, but release builds wrap around.`,
      },
      {
        title: "Audit Preparation",
        content: `When preparing for an audit, ensure your code is well-documented, use clear variable names, and include 
        comprehensive tests. Consider getting feedback from other developers before formal audits.`,
      },
    ],
  },
}

export function ModuleContent({
  moduleId,
  onClose,
}: {
  moduleId: string
  onClose: () => void
}) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const module = moduleData[moduleId as keyof typeof moduleData]

  if (!module) {
    return (
      <div className="w-full h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">Module not found</p>
          <Button onClick={onClose} className="bg-gradient-to-r from-[#9945FF] to-[#14F195]">
            Back to Universe
          </Button>
        </Card>
      </div>
    )
  }

  const currentSection = module.sections[currentSectionIndex]
  const progress = ((currentSectionIndex + 1) / module.sections.length) * 100

  return (
    <div className="w-full h-screen bg-gradient-to-br from-background to-card/50 overflow-hidden">
      {/* Header */}
      <div className="h-24 bg-gradient-to-r from-[#9945FF]/10 to-[#14F195]/10 border-b border-primary/20 flex items-center px-8 sticky top-0 z-40">
        <div className="flex-1 max-w-7xl mx-auto flex items-center justify-between w-full">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">{module.title}</h1>
            <p className="text-sm text-muted-foreground">{module.description}</p>
          </div>
          <Button onClick={onClose} variant="outline" className="border-primary/30 hover:bg-primary/10 bg-transparent">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex h-[calc(100vh-6rem)]">
        {/* Main Content */}
        <div className="flex-1 overflow-auto px-8 py-6">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 bg-card/80 backdrop-blur border-primary/20">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white" variant="default">
                      Section {currentSectionIndex + 1} of {module.sections.length}
                    </Badge>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{currentSection.title}</h2>
                </div>
              </div>

              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{currentSection.content}</p>
              </div>

              {/* Code Example Box */}
              <div className="bg-muted/30 border border-primary/20 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Code2 className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">Key Concepts</p>
                </div>
                <ul className="space-y-2">
                  {currentSection.title && (
                    <>
                      <li className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Master the fundamentals of {currentSection.title.toLowerCase()}
                      </li>
                      <li className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Apply concepts to real-world Solana programs
                      </li>
                      <li className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Build production-ready smart contracts
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">Module Progress</span>
                  <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#9945FF] to-[#14F195] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={() => setCurrentSectionIndex(Math.max(0, currentSectionIndex - 1))}
                  disabled={currentSectionIndex === 0}
                  variant="outline"
                  className="border-primary/30 hover:bg-primary/10"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <Button
                  onClick={() => setCurrentSectionIndex(Math.min(module.sections.length - 1, currentSectionIndex + 1))}
                  disabled={currentSectionIndex === module.sections.length - 1}
                  className="flex-1 bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90"
                >
                  Next Section
                  <ChevronLeft className="w-4 h-4 ml-2 rotate-180" />
                </Button>

                {currentSectionIndex === module.sections.length - 1 && (
                  <Button onClick={onClose} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Complete Module
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Sidebar - Sections List */}
        <div className="w-80 bg-card/50 border-l border-primary/20 flex flex-col">
          <div className="p-6 border-b border-primary/20">
            <h3 className="font-semibold text-foreground mb-2">Contents</h3>
            <p className="text-xs text-muted-foreground">{module.sections.length} sections to explore</p>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {module.sections.map((section, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSectionIndex(idx)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    idx === currentSectionIndex
                      ? "bg-gradient-to-r from-[#9945FF]/30 to-[#14F195]/30 border border-primary/50 text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {idx < currentSectionIndex ? (
                      <CheckCircle2 className="w-4 h-4 text-[#14F195]" />
                    ) : (
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          idx === currentSectionIndex ? "border-primary bg-primary" : "border-muted-foreground"
                        }`}
                      />
                    )}
                    <span className="text-sm">{section.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-primary/20">
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full border-primary/30 hover:bg-primary/10 bg-transparent"
            >
              Exit Module
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
