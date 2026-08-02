import GlitchText from "./GlitchText";
import DecryptedText from "./DecryptedText";

interface TerminalHeaderProps {
  title: string;
  subtitle: string;
}

export default function TerminalHeader({ title, subtitle }: TerminalHeaderProps) {
  return (
    <div className="mb-10">
      <h1 className="font-display text-4xl font-bold uppercase tracking-widest text-text-primary">
        <GlitchText text={title} />
      </h1>
      <p className="mt-2 font-mono text-xs uppercase tracking-widest text-signal-cyan">
        <DecryptedText text={subtitle} animateOn="view" speed={40} />
      </p>
    </div>
  );
}
