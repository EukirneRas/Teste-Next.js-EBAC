'use client';

import { useState } from 'react';
import { Tarefa } from '@/types/tarefa';
import { useContadorDeTarefas } from '@/hooks/useContadorDeTarefas';
import NovaTarefa from './NovaTarefa';

interface ListaDeTarefasProps {
  tarefasIniciais: Tarefa[];
}

export default function ListaDeTarefas({ tarefasIniciais }: ListaDeTarefasProps) {
  const [tarefas, setTarefas] = useState<Tarefa[]>(tarefasIniciais);
  const { total, concluidas, pendentes } = useContadorDeTarefas(tarefas);

  function handleAdicionar(titulo: string) {
    const novaTarefa: Tarefa = {
      id: String(Date.now()),
      titulo,
      concluida: false,
    };

    setTarefas((atual) => [...atual, novaTarefa]);
  }

  return (
    <section>
      <p data-testid="contador">
        Total: {total} | Concluídas: {concluidas} | Pendentes: {pendentes}
      </p>

      <ul data-testid="lista-tarefas">
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            {tarefa.titulo} {tarefa.concluida ? '✅' : '⏳'}
          </li>
        ))}
      </ul>

      <NovaTarefa onAdicionar={handleAdicionar} />
    </section>
  );
}
