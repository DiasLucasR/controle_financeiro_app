
export interface ListaHistoricoProps {
  listaHistorico: HistoricoObjeto;
  setModalVisivel: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface HistoricoObjeto {
  id: Number,
  descricao: String,
  lista: ListaObjeto[]
}

export interface ListaObjeto { id: string; descricao: string; valor: string }

export interface FormPagamentosProps {
  setLista: React.Dispatch<React.SetStateAction<ListaObjeto[]>>;
  setModalVisivel: React.Dispatch<React.SetStateAction<boolean>>;
}
