import { useMemo } from 'react';
import { Tarefa } from '@/types/tarefa';

interface ContadorDeTarefas {
  total: number;
  concluidas: number;
  pendentes: number;
}

export function useContadorDeTarefas(tarefas: Tarefa[]): ContadorDeTarefas {
  const total = useMemo(() => tarefas.length, [tarefas]);

  const concluidas = useMemo(
    () => tarefas.filter((tarefa) => tarefa.concluida).length,
    [tarefas]
  );

  const pendentes = total - concluidas;

  return { total, concluidas, pendentes };
}
