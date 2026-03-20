import { useEffect, useState, useCallback } from "react";

const Index = () => {
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    setMousePos({
      x: clientX / window.innerWidth,
      y: clientY / window.innerHeight,
    });
  }, []);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-foundros-bg select-none overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Cursor glow */}
      <div
        className="pointer-events-none absolute w-[600px] h-[600px] rounded-full transition-[left,top] duration-300 ease-out"
        style={{
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, hsla(0,0%,0%,0.03) 0%, transparent 70%)",
        }}
      />

      <div
        className={`text-center px-6 transition-all duration-1000 ease-out relative z-10 ${
          visible
            ? "opacity-100 translate-y-0 blur-0"
            : "opacity-0 translate-y-2 blur-sm"
        }`}
      >
        <h1 className="text-foundros-heading font-semibold tracking-tight leading-[1.08] text-foundros-fg">
          <span className="block">The way founders browse the internet</span>
          <span className="block">is about to change.</span>
        </h1>
      </div>

      <p
        className={`absolute bottom-10 text-foundros-caption tracking-widest uppercase text-foundros-muted transition-all duration-1000 delay-700 ease-out z-10 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        Join the waitlist
      </p>
    </div>
  );
};

export default Index;
