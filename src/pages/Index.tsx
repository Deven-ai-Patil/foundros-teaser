import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setError("");

    const { error: dbError } = await supabase
      .from("waitlist")
      .insert({ email });

    if (dbError) {
      if (dbError.code === "23505") {
        setError("You're already on the list.");
      } else {
        setError("Something went wrong. Try again.");
      }
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setModalOpen(false);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 300);
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-foundros-bg select-none overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div
        className="pointer-events-none absolute w-[600px] h-[600px] rounded-full transition-[left,top] duration-300 ease-out"
        style={{
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, hsla(0,0%,0%,0.03) 0%, transparent 70%)",
        }}
      />

      <div
        className={`text-center px-6 transition-all duration-1000 ease-out relative z-10 ${
          visible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-2 blur-sm"
        }`}
      >
        <h1 className="text-foundros-heading font-semibold tracking-tight leading-[1.08] text-foundros-fg">
          <span className="block">The way founders browse the internet</span>
          <span className="block">is about to change.</span>
        </h1>
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className={`absolute bottom-10 text-foundros-caption tracking-widest uppercase text-foundros-muted transition-all duration-1000 delay-700 ease-out z-10 bg-transparent border-none cursor-pointer hover:text-foundros-fg active:scale-[0.97] ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        Join the waitlist
      </button>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setModalOpen(false)}
        >
          <div className="absolute inset-0 bg-foundros-bg/80 backdrop-blur-sm animate-[fadeOverlay_0.3s_ease-out]" />
          <div
            className="relative z-10 w-full max-w-sm mx-6 animate-[fadeModal_0.4s_cubic-bezier(0.16,1,0.3,1)]"
            onClick={(e) => e.stopPropagation()}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
                <p className="text-sm tracking-wide text-foundros-muted">
                  Get early access
                </p>
                <div className="w-full flex flex-col items-center gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="you@company.com"
                    autoFocus
                    className="w-full bg-transparent border-b border-foundros-muted/30 text-foundros-fg text-center text-lg py-3 outline-none placeholder:text-foundros-muted/40 focus:border-foundros-fg/40 transition-colors duration-300"
                  />
                  {error && (
                    <p className="text-xs text-foundros-muted animate-[fadeModal_0.3s_ease-out]">
                      {error}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="text-xs tracking-[0.2em] uppercase text-foundros-muted hover:text-foundros-fg transition-colors duration-300 active:scale-[0.97]"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p className="text-center text-sm tracking-wide text-foundros-fg animate-[fadeModal_0.4s_ease-out]">
                You're on the list.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
