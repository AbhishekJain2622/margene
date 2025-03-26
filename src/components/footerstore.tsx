export function FooterStore() {
  return (
    <footer className="w-full mt-24 font-serif px-6 md:px-12">
      <div className="pt-12 pb-12 flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
        {/* Left Column (Text) */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-2">Keep in touch!</h3>
          <p className="text-base italic text-gray-600 max-w">
            Stay in the loop and be the first to know about what’s coming next.
          </p>
        </div>

        {/* Right Column (Links) */}
        <div className="flex gap-[40px] ml-0 text-[17px]">


          <p className="hover:italic cursor-pointer font-semibold">Terms of Use</p>
          <p className="hover:italic cursor-pointer">Shipping & Returns</p>
          <p className="hover:italic cursor-pointer">FAQ</p>
          <p className="hover:italic cursor-pointer">Instagram</p>
          <p className="hover:italic cursor-pointer">Contact</p>
        </div>
      </div>
    </footer>
  );
}
