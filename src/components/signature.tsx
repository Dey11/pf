export default function Signature() {
  return (
    <div className="relative flex h-fit w-fit flex-col leading-none">
      <span className="absolute left-0 block text-[4svw] font-medium sm:text-[4svh]">
        i'm
      </span>
      <p className="block text-[10svw] font-bold sm:text-[10svh]">
        shreyan <span className="text-secondary">dey</span>
      </p>
      <span className="absolute right-[5svw] -bottom-[2svw] block text-[4svw] font-medium sm:right-[5svh] sm:-bottom-[2svh] sm:text-[4svh]">
        a fullstack dev
      </span>
    </div>
  );
}
