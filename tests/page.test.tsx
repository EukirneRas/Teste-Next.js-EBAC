import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/app/page';

describe('Página inicial (Server Component)', () => {
  it('renderiza o título e a lista de tarefas vinda dos dados simulados', async () => {
    const ui = await Home();
    render(ui);

    expect(screen.getByRole('heading', { name: /minhas tarefas/i })).toBeInTheDocument();
    expect(screen.getByTestId('lista-tarefas')).toBeInTheDocument();
    expect(screen.getByText(/estudar next\.js 15/i)).toBeInTheDocument();
    expect(screen.getByText(/praticar testes unitários/i)).toBeInTheDocument();
    expect(screen.getByText(/revisar server components/i)).toBeInTheDocument();
  });

  it('exibe o contador de tarefas correto com os dados iniciais', async () => {
    const ui = await Home();
    render(ui);

    expect(screen.getByTestId('contador')).toHaveTextContent(
      'Total: 3 | Concluídas: 1 | Pendentes: 2'
    );
  });

  it('permite adicionar uma nova tarefa através do formulário e atualiza o contador', async () => {
    const user = userEvent.setup();
    const ui = await Home();
    render(ui);

    const input = screen.getByLabelText(/nova tarefa/i);
    await user.type(input, 'Nova tarefa de teste');
    await user.click(screen.getByRole('button', { name: /adicionar/i }));

    expect(screen.getByText(/nova tarefa de teste/i)).toBeInTheDocument();
    expect(screen.getByTestId('contador')).toHaveTextContent('Total: 4');
  });
});
