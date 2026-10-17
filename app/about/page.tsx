export const metadata = { title: "About · Acme Corp" };

export default function About() {
  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <h1 className="text-3xl font-semibold tracking-tight">About Acme</h1>
      <p className="text-black/70">
        Acme Corp has supplied ambitious customers since 1949. Every product ships with clear
        instructions, which most customers choose not to read.
      </p>
      <p className="text-black/70">Questions: orders@acme.example</p>
    </div>
  );
}
