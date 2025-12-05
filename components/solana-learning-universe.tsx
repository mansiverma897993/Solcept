"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera, Float, Html } from "@react-three/drei"
import { Suspense, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Code2, Boxes, Layers, Lock, CheckCircle2, X } from "lucide-react"
import { ModuleContent } from "./module-content"

const learningModules = [
  {
    id: "intro",
    title: "Solana Fundamentals",
    position: [0, 0, 0] as [number, number, number],
    color: "#9945FF",
    topics: ["Blockchain Basics", "Accounts Model", "Transactions", "Programs"],
    completed: true,
  },
  {
    id: "rust",
    title: "Rust for Solana",
    position: [4, 1, -2] as [number, number, number],
    color: "#14F195",
    topics: ["Ownership", "Traits", "Memory Safety", "Error Handling"],
    completed: true,
  },
  {
    id: "anchor",
    title: "Anchor Framework",
    position: [-4, 1.5, -1] as [number, number, number],
    color: "#19FB9B",
    topics: ["Account Constraints", "Cross-Program Invocation", "PDAs", "Testing"],
    completed: false,
  },
  {
    id: "advanced",
    title: "Advanced Concepts",
    position: [2, -1, 3] as [number, number, number],
    color: "#FF6EC7",
    topics: ["State Compression", "Token Extensions", "Versioned Transactions"],
    completed: false,
  },
  {
    id: "security",
    title: "Security & Auditing",
    position: [-3, -0.5, 2] as [number, number, number],
    color: "#FFA500",
    topics: ["Common Vulnerabilities", "Best Practices", "Audit Checklist"],
    completed: false,
  },
]

function SolanaLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 397.7 311.7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient
          id="solanaGradient"
          x1="360.88"
          y1="351.46"
          x2="-141.56"
          y2="-39.2"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
      </defs>
      <path
        d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z"
        fill="url(#solanaGradient)"
      />
      <path
        d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"
        fill="url(#solanaGradient)"
      />
      <path
        d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"
        fill="url(#solanaGradient)"
      />
    </svg>
  )
}

function LearningNode({
  position,
  color,
  title,
  topics,
  completed,
  onClick,
}: {
  position: [number, number, number]
  color: string
  title: string
  topics: string[]
  completed: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onClick}
          scale={hovered ? 1.2 : 1}
        >
          <icosahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 1.2 : 0.5}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {completed && (
          <mesh position={[0.6, 0.6, 0]}>
            <circleGeometry args={[0.2, 32]} />
            <meshBasicMaterial color="#14F195" />
          </mesh>
        )}

        <Html
          position={[0, -1.2, 0]}
          center
          distanceFactor={6}
          style={{
            pointerEvents: hovered ? "auto" : "none",
            opacity: hovered ? 1 : 0.7,
            transition: "opacity 0.3s",
          }}
        >
          <div className="text-center">
            <p className="font-bold text-sm text-foreground mb-1">{title}</p>
            {hovered && (
              <div className="text-xs text-muted-foreground space-y-0.5">
                {topics.slice(0, 2).map((topic, i) => (
                  <div key={i}>{topic}</div>
                ))}
              </div>
            )}
          </div>
        </Html>
      </group>
    </Float>
  )
}

function ConnectingLines() {
  return (
    <group>
      {/* Connect nodes with glowing lines */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, 0, 0, 4, 1, -2])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#9945FF" opacity={0.5} transparent />
      </line>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, 0, 0, -4, 1.5, -1])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#9945FF" opacity={0.5} transparent />
      </line>
    </group>
  )
}

function ParticleField() {
  const particleCount = 100
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#9945FF" transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

function Scene({ onModuleClick }: { onModuleClick: (moduleId: string) => void }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 10]} />
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        minDistance={5}
        maxDistance={20}
        autoRotate
        autoRotateSpeed={0.5}
      />

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#9945FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#14F195" />

      <Environment preset="night" />

      <ParticleField />
      <ConnectingLines />

      {learningModules.map((module) => (
        <LearningNode
          key={module.id}
          position={module.position}
          color={module.color}
          title={module.title}
          topics={module.topics}
          completed={module.completed}
          onClick={() => onModuleClick(module.id)}
        />
      ))}
    </>
  )
}

export function SolanaLearningUniverse() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [activeContent, setActiveContent] = useState<string | null>(null)
  const [showWelcome, setShowWelcome] = useState(true)

  const handleModuleClick = (moduleId: string) => {
    setSelectedModule(moduleId)
    setShowWelcome(false)
  }

  const handleStartModule = (moduleId: string) => {
    setActiveContent(moduleId)
  }

  const selectedModuleData = learningModules.find((m) => m.id === selectedModule)

  if (activeContent) {
    return <ModuleContent moduleId={activeContent} onClose={() => setActiveContent(null)} />
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Canvas
        className="w-full h-full"
        onCreated={(state) => {
          state.gl.setClearColor("#050010")
        }}
      >
        <Suspense
          fallback={
            <Html center>
              <div className="text-white">Loading 3D Environment...</div>
            </Html>
          }
        >
          <Scene onModuleClick={handleModuleClick} />
        </Suspense>
      </Canvas>

      {/* HUD Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-start justify-between">
          <div className="pointer-events-auto">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#9945FF] to-[#14F195] p-2 flex items-center justify-center shadow-lg shadow-primary/50 transform hover:scale-110 transition-transform duration-300">
                <SolanaLogo size={48} />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent tracking-tight">
                  Solcept
                </h1>
                <p className="text-sm text-muted-foreground font-semibold">Master Solana Development</p>
              </div>
            </div>
          </div>

          <div className="pointer-events-auto flex gap-2">
            <Badge
              variant="secondary"
              className="text-xs bg-secondary/20 border border-secondary/30 text-secondary-foreground"
            >
              <CheckCircle2 className="w-3 h-3 mr-1" />
              2/5 Modules Complete
            </Badge>
          </div>
        </div>
      </div>

      {/* Welcome Card */}
      {showWelcome && (
        <div className="absolute bottom-8 left-8 pointer-events-auto max-w-md">
          <Card className="p-6 bg-card/95 backdrop-blur-sm border-2 border-primary/30 shadow-2xl shadow-primary/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9945FF] to-[#14F195] p-0.5 flex items-center justify-center flex-shrink-0">
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                  <SolanaLogo size={24} />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-card-foreground mb-2">Welcome to Solcept</h2>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Navigate through the 3D space to explore learning modules. Click on any glowing node to start your
                  journey into Solana development.
                </p>
                <div className="flex gap-3 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#14F195] shadow-lg shadow-[#14F195]/50" />
                    <span>Completed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#9945FF] shadow-lg shadow-[#9945FF]/50" />
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-3 h-3" />
                    <span>Locked</span>
                  </div>
                </div>
                <Button
                  onClick={() => setShowWelcome(false)}
                  className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 transition-opacity"
                >
                  Start Exploring
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Module Details Panel */}
      {selectedModuleData && (
        <div className="absolute bottom-8 right-8 pointer-events-auto max-w-sm">
          <Card className="p-6 bg-card/95 backdrop-blur-sm border-2 border-primary/30 shadow-2xl shadow-primary/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-card-foreground mb-1">{selectedModuleData.title}</h3>
                <Badge
                  variant={selectedModuleData.completed ? "default" : "secondary"}
                  className={
                    selectedModuleData.completed ? "text-xs bg-secondary shadow-lg shadow-secondary/50" : "text-xs"
                  }
                >
                  {selectedModuleData.completed ? "Completed" : "In Progress"}
                </Badge>
              </div>
              <button
                onClick={() => setSelectedModule(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <h4 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Learning Topics
              </h4>
              <div className="space-y-2">
                {selectedModuleData.topics.map((topic, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-lg shadow-primary/50" />
                    <span className="text-muted-foreground">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => handleStartModule(selectedModuleData.id)}
                className="flex-1 bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 transition-opacity"
                size="sm"
              >
                <Code2 className="w-4 h-4 mr-2" />
                Start Module
              </Button>
              <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10 bg-transparent">
                <Boxes className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Controls Info */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto">
        <Card className="px-4 py-2 bg-card/90 backdrop-blur-sm border border-primary/20">
          <p className="text-xs text-muted-foreground">
            <kbd className="px-2 py-0.5 bg-muted rounded text-muted-foreground border border-border">Click + Drag</kbd>{" "}
            to rotate •{" "}
            <kbd className="px-2 py-0.5 bg-muted rounded text-muted-foreground border border-border">Scroll</kbd> to
            zoom •{" "}
            <kbd className="px-2 py-0.5 bg-muted rounded text-muted-foreground border border-border">Click Node</kbd> to
            learn
          </p>
        </Card>
      </div>
    </div>
  )
}
