import { useEffect, useState } from "react";

const Index = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-foundros-bg select-none">
      <div
        className={`text-center px-6 transition-all duration-1000 ease-out ${
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
        className={`absolute bottom-10 text-foundros-caption tracking-widest uppercase text-foundros-muted transition-all duration-1000 delay-700 ease-out ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        Join the waitlist
      </p>
    </div>
  );
};

export default Index;
