import { fireEvent, render, screen } from '@testing-library/react';
import PostComment from '.';

describe('Teste para o componente PostComment', () => {
    it('Deve renderizar o componente corretamente', () => {
        render(<PostComment/>);
        expect(screen.getByText('Comentar')).toBeInTheDocument();
    });

    it('Deve inserir dois comentários e manter o primeiro', () => {
        render(<PostComment/>);

        const campoComentario = screen.getByTestId('comment-input');
        const botaoComentar = screen.getByTestId('comment-submit');

        expect(screen.queryAllByTestId('comment-item')).toHaveLength(0);

        fireEvent.change(campoComentario, {
            target: { value: 'Primeiro comentário'}
        });

        fireEvent.click(botaoComentar);

        const comentariosAposPrimeiro = screen.getAllByTestId('comment-item');

        expect(comentariosAposPrimeiro).toHaveLength(1);
        expect(comentariosAposPrimeiro[0]).toHaveTextContent('Primeiro comentário');

        expect(campoComentario).toHaveValue('');

        fireEvent.change(campoComentario, {
            target: { value: 'Segundo comentário'}
        });

        fireEvent.click(botaoComentar);

        const comentariosAposSegundo = screen.getAllByTestId('comment-item');

        expect(comentariosAposSegundo).toHaveLength(2);
        expect(comentariosAposSegundo[0]).toHaveTextContent('Primeiro comentário');
        expect(comentariosAposSegundo[1]).toHaveTextContent('Segundo comentário');
        expect(campoComentario).toHaveValue('');
    })
});