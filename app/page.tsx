import { getTarefas } from '@/lib/tarefas';
import ListaDeTarefas from '@/components/ListaDeTarefas';

export default async function Home() {
  const tarefas = await getTarefas();

  return (
    <main className="container">
      <h1>Minhas Tarefas</h1>
      <ListaDeTarefas tarefasIniciais={tarefas} />
    </main>
  );
}
