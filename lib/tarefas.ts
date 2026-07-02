import { Tarefa } from '@/types/tarefa';

const tarefasIniciais: Tarefa[] = [
  { id: '1', titulo: 'Estudar Next.js 15', concluida: false },
  { id: '2', titulo: 'Praticar testes unitários', concluida: false },
  { id: '3', titulo: 'Revisar Server Components', concluida: true },
];

export async function getTarefas(): Promise<Tarefa[]> {
  return Promise.resolve(tarefasIniciais);
}
