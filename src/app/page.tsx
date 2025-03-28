// Importa o componente otimizado de imagem do Next.js
import Image from "next/image";
import SideBar from "@/components/SideBar"; // ajuste o caminho se necessário

// Função principal da página inicial
export default function Home() {
  return (
    // Container principal da página
    // Define fundo preto, texto branco, padding e posiciona conteúdo no topo esquerdo
    <div className="flex items-start justify-start min-h-screen bg-black text-white px-8 pt-6">
      
      
      <SideBar /> {/* Aqui está a chamada para o menu */}
    </div>
  );
}
