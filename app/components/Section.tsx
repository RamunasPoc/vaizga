'use client';

export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 space-y-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}
