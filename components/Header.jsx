import Image from 'next/image'; 
import { LuPhone } from "react-icons/lu"; 
import { MdOutlineMailOutline } from "react-icons/md"; 

export default function Header() {
  return (
    <header
      style={{
        position: 'fixed', width: '100%', height: '80px',  backgroundColor: '#FFF',
        direction: 'rtl',  zIndex: 9999, display: 'flex',      
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto',  display: 'flex',  justifyContent: 'space-between', alignItems: 'center',   
        width: '100%', gap: '20px', fontSize: '14px',color: '#000',     
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image src="/df475dc1-e743-4e76-9407-d8abeca1055e.png.png" alt="Logo" width={50} height={50} />
          <Image src="/d8e70213-98ea-49e6-a02c-4cfd2367f008.png.png" alt="Logo Text" width={100} height={30} />
        </div>

        <div style={{ display: 'flex',gap: '30px', alignItems: 'center', direction: 'ltr', textAlign: 'left'   }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A1A1A1' }}>
            <LuPhone color="#000" size={20} />

            <a href="tel:+966570779695" style={{ color: '#111', textDecoration: 'none' }}>
              +966 570 779 695
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A1A1A1' }}>
            <MdOutlineMailOutline color="#000" size={20} />

            <a href="mailto:Mutanafes.hr@gmail.com" style={{ color: '#111', textDecoration: 'none' }}>
              Mutanafes.hr@gmail.com
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}











