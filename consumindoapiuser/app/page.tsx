import ListaUsuarios from "@/components/ListaUsuarios";
import BuscaCep from "@/components/ConsultaCep";

export default function Home() {
  return (
    <>
      <h1>CONSUMINDO API</h1>
      <ListaUsuarios></ListaUsuarios>
      <BuscaCep></BuscaCep>
    </>
  )
}