import { renderHook } from '@testing-library/react';
import { useContadorDeTarefas } from '@/hooks/useContadorDeTarefas';
import { Tarefa } from '@/types/tarefa';

describe('useContadorDeTarefas', () => {
  it('retorna zero para todos os valores quando a lista está vazia', () => {
    const { result } = renderHook(() => useContadorDeTarefas([]));

    expect(result.current.total).toBe(0);
    expect(result.current.concluidas).toBe(0);
    expect(result.current.pendentes).toBe(0);
  });

  it('conta corretamente o total de tarefas concluídas e pendentes', () => {
    const tarefas: Tarefa[] = [
      { id: '1', titulo: 'A', concluida: true },
      { id: '2', titulo: 'B', concluida: false },
      { id: '3', titulo: 'C', concluida: true },
    ];

    const { result } = renderHook(() => useContadorDeTarefas(tarefas));

    expect(result.current.total).toBe(3);
    expect(result.current.concluidas).toBe(2);
    expect(result.current.pendentes).toBe(1);
  });

  it('atualiza os valores quando a lista de tarefas é alterada (rerender)', () => {
    const tarefasIniciais: Tarefa[] = [{ id: '1', titulo: 'A', concluida: false }];

    const { result, rerender } = renderHook(
      ({ tarefas }) => useContadorDeTarefas(tarefas),
      { initialProps: { tarefas: tarefasIniciais } }
    );

    expect(result.current.total).toBe(1);
    expect(result.current.pendentes).toBe(1);

    const tarefasAtualizadas: Tarefa[] = [
      ...tarefasIniciais,
      { id: '2', titulo: 'B', concluida: true },
    ];

    rerender({ tarefas: tarefasAtualizadas });

    expect(result.current.total).toBe(2);
    expect(result.current.concluidas).toBe(1);
    expect(result.current.pendentes).toBe(1);
  });
});
