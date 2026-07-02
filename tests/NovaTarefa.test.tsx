import { render, screen, fireEvent } from '@testing-library/react';
import NovaTarefa from '@/components/NovaTarefa';

describe('<NovaTarefa />', () => {
  it('renderiza o input e o botão corretamente', () => {
    render(<NovaTarefa onAdicionar={jest.fn()} />);

    expect(screen.getByLabelText(/nova tarefa/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /adicionar/i })).toBeInTheDocument();
  });

  it('mantém o botão desabilitado quando o input está vazio', () => {
    render(<NovaTarefa onAdicionar={jest.fn()} />);

    expect(screen.getByRole('button', { name: /adicionar/i })).toBeDisabled();
  });

  it('habilita o botão ao digitar um título válido', () => {
    render(<NovaTarefa onAdicionar={jest.fn()} />);
    const input = screen.getByLabelText(/nova tarefa/i);

    fireEvent.change(input, { target: { value: 'Estudar Jest' } });

    expect(screen.getByRole('button', { name: /adicionar/i })).toBeEnabled();
  });

  it('chama onAdicionar com o título digitado ao submeter o formulário', () => {
    const onAdicionar = jest.fn();
    render(<NovaTarefa onAdicionar={onAdicionar} />);

    const input = screen.getByLabelText(/nova tarefa/i);
    fireEvent.change(input, { target: { value: 'Escrever testes' } });
    fireEvent.click(screen.getByRole('button', { name: /adicionar/i }));

    expect(onAdicionar).toHaveBeenCalledTimes(1);
    expect(onAdicionar).toHaveBeenCalledWith('Escrever testes');
  });

  it('limpa o valor do input após a submissão', () => {
    render(<NovaTarefa onAdicionar={jest.fn()} />);
    const input = screen.getByLabelText(/nova tarefa/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Tarefa temporária' } });
    fireEvent.click(screen.getByRole('button', { name: /adicionar/i }));

    expect(input.value).toBe('');
  });

  it('não chama onAdicionar ao submeter com título vazio ou apenas espaços', () => {
    const onAdicionar = jest.fn();
    render(<NovaTarefa onAdicionar={onAdicionar} />);

    const input = screen.getByLabelText(/nova tarefa/i);
    const form = screen.getByRole('button', { name: /adicionar/i }).closest('form');

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.submit(form as HTMLFormElement);

    expect(onAdicionar).not.toHaveBeenCalled();
  });
});
