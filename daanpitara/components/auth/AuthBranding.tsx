import Image from 'next/image';

export default function AuthBranding() {
  return (
    <div className="hidden md:flex w-1/2 bg-white relative overflow-hidden h-full items-center justify-center border-l border-gray-100">
      <div className="flex flex-col items-center gap-[90px]">
        <div 
            style={{
                color: 'black', 
                fontSize: '40px', 
                fontWeight: '400', 
                wordWrap: 'break-word',
                textAlign: 'center'
            }} 
            className="font-[Satoshi]"
        >
            Your Compassion Our Code!
        </div>
        <div className="w-[500px] h-[500px] relative flex items-center justify-center">
             <img src="/Logo.png" alt="DaanPitara" className="w-full h-full object-contain" />
        </div>
      </div>
    </div>
  );
}
