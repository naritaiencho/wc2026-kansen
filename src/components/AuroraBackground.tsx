export default function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div
        className="absolute -left-[20%] -top-[25%] h-[70vh] w-[70vw] rounded-full opacity-[0.16] blur-3xl animate-aurora-1"
        style={{ background: 'radial-gradient(circle, #1E6FFF 0%, transparent 65%)' }}
      />
      <div
        className="absolute -right-[18%] top-[30%] h-[64vh] w-[60vw] rounded-full opacity-[0.12] blur-3xl animate-aurora-2"
        style={{ background: 'radial-gradient(circle, #F5C518 0%, transparent 65%)' }}
      />
      <div
        className="absolute left-[25%] -bottom-[28%] h-[68vh] w-[64vw] rounded-full opacity-[0.1] blur-3xl animate-aurora-3"
        style={{ background: 'radial-gradient(circle, #00E07F 0%, transparent 65%)' }}
      />
      <div className="pitch-lines absolute inset-0" />
    </div>
  )
}
