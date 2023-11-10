import styles from "./PerfilClinica.module.scss";
import Sidebar from "../../../components/clinica/sideBar/SidebarClinica";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Perfil() {
  const [listClinicas, setClinicas] = useState();
  console.log(listClinicas);
  const [listEnderecoClinica, setEnderecoClinica] = useState();
  const IdClinica =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;
  const [cep, setCep] = useState();
  const [editMode, setEditMode] = useState(false);

  const [editTelefone, setEditedTelefone] = useState(
    listClinicas?.clinica[0].telefone
  );
  const [editEmail, setEditEmail] = useState(listClinicas?.clinica[0].email);
  const [editRazaoSocial, setEditRazaoSocial] = useState(
    listClinicas?.clinica[0].razao_social
  );
  const [editDescricao, setEditDescricao] = useState(
    listClinicas?.clinica[0].descricao
  );
  const [editCep, setEditCep] = useState(listClinicas?.clinica[0].cep);
  const [editNumero, setEditNumero] = useState(listClinicas?.clinica[0].numero);

  function PutPerfilClinica() {
    const url = `http://localhost:3000/clinica/${IdClinica}`;
    const jsonData = {
      razao_social: listClinicas?.clinica[0].razao_social,
      cnpj: listClinicas?.clinica[0].cnpj,
      razao_social: listClinicas?.clinica[0].razao_social,
      descricao: editDescricao
        ? editDescricao
        : listClinicas?.clinica[0].descricao,
      email: listClinicas?.clinica[0].email,
      foto: listClinicas?.clinica[0].foto,
      id_telefone: listClinicas?.clinica[0].idTelefone,
      telefone: editTelefone ? editTelefone : listClinicas?.clinica[0].telefone,
      tipo_telefone: 2,
      id_endereco: listClinicas?.clinica[0].idEndereco,
      numero: editNumero ? editNumero : listClinicas?.clinica[0].numero,
      complemento: listClinicas?.clinica[0].complemento,
      cep: editCep ? editCep : listClinicas?.clinica[0].cep,
    };

    axios
      .patch(url, jsonData)
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (response.status == 200) {
          const notify = () =>
            toast.success(data.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          notify();
        } else {
          toast.error(data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          notify();
        }
      })
      .catch((error) => {
        error;
      });
  }

  useEffect(() => {
    function getClinica() {
      const url = `http://localhost:3000/clinica/${IdClinica}`;
      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          setClinicas(data);
          const cepFromResponse = data.clinica[0].cep;
          setCep(cepFromResponse);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    getClinica();
  }, [IdClinica]);

  useEffect(() => {
    if (cep) {
      function enderecoClinica(cep) {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        axios
          .get(url)
          .then((response) => {
            const data = response.data;
            setEnderecoClinica(data);
          })
          .catch((error) => console.log(error));
      }

      enderecoClinica(cep);
    }
  }, [cep]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="black"
      />

      <section className={styles.container_geral}>
        <Sidebar />
        <div className={styles.container}>
          <div className={styles.container_cima}>
            <h1 className={styles.container_title}>Vizualização do perfil</h1>
          </div>
          <div className={styles.container_perfil}>
            <div className={styles.container_dados}>
              {listClinicas?.clinica.map((clinica) => (
                <>
                  <div className={styles.dados_iniciais}>
                    <div className={styles.dados_foto}>
                      <div className={styles.img_img}>
                        <img
                          src={clinica.foto}
                          alt="Foto de perfil da clinica"
                        />
                      </div>
                      <div className={styles.inputs}>
                        {editMode ? (
                          <>
                            <label htmlFor="">
                              Nome:
                              <input
                                placeholder={editRazaoSocial}
                                value={editRazaoSocial}
                                onChange={(e) => setEditRazaoSocial(e.target.value)}
                              />
                            </label>
                            <label htmlFor="">
                              Telefone:
                              <input
                                placeholder={editTelefone}
                                value={editTelefone}
                                onChange={(e) =>
                                  setEditedTelefone(e.target.value)
                                }
                              />
                            </label>
                            <label htmlFor="">
                              E-mail:
                              <input
                                placeholder={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                              />
                            </label>
                          </>
                        ) : (
                          <>
                            <label htmlFor="">
                              Nome:
                              <input
                                style={{ color: "#aaa3aa" }}
                                value={clinica.razao_social}
                              />
                            </label>
                            <label htmlFor="">
                              {" "}
                              Telefone:
                              <input
                                style={{ color: "#aaa3aa" }}
                                value={clinica.telefone}
                              />
                            </label>

                            <label htmlFor="">
                              E-mail:
                              <input
                                style={{ color: "#aaa3aa" }}
                                value={clinica.email}
                              />
                            </label>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={styles.dados_finais}>
                    <div className={styles.inputs_row1}>
                      {editMode ? (
                        <textarea
                          placeholder={editDescricao}
                          onChange={(e) => setEditDescricao(e.target.value)}
                          className="input_descricao"
                        />
                      ) : (
                        <textarea
                          style={{ color: "#aaa3aa" }}
                          value={clinica.descricao}
                          className="input_descricao"
                        />
                      )}
                    </div>
                    <div className={styles.inputs_row2}>
                      {editMode ? (
                        <>
                          <label htmlFor="">
                            Cep:{" "}
                            <input
                              placeholder={clinica.cep}
                              onChange={(e) => setEditCep(e.target.value)}
                              className={styles.input_cep}
                            />
                          </label>
                          <label htmlFor="">
                            Logradouro:{" "}
                            <input
                              value={listEnderecoClinica?.logradouro}
                              placeholder={listEnderecoClinica?.logradouro}
                              className={styles.input_rua}
                            />
                          </label>

                          <label htmlFor="">
                            Número
                            <input
                              type="text"
                              placeholder={editNumero}
                              onChange={(e) => setEditNumero(e.target.value)}
                              className={styles.input_n}
                            />
                          </label>
                          <label htmlFor="">
                            Bairro:
                            <input
                              value={listEnderecoClinica?.bairro}
                              placeholder={listEnderecoClinica?.bairro}
                              className={styles.input_bairro}
                            />
                          </label>

                          <label htmlFor="">
                            Cidade:
                            <input
                              value={listEnderecoClinica?.localidade}
                              placeholder={listEnderecoClinica?.localidade}
                              className={styles.input_cidade}
                            />
                          </label>
                        </>
                      ) : (
                        <>
                          <label htmlFor="">
                            {" "}
                            Cep:
                            <input
                              style={{ color: "#aaa3aa" }}
                              placeholder={clinica.cep}
                              value={clinica.cep}
                              className={styles.input_cep}
                            />
                          </label>
                          <label htmlFor="">
                            {" "}
                            Logradouro:
                            <input
                              style={{ color: "#aaa3aa" }}
                              value={listEnderecoClinica?.logradouro}
                              className={styles.input_rua}
                            />
                          </label>
                          <label htmlFor="">
                            Número:
                            <input
                              style={{ color: "#aaa3aa" }}
                              value={clinica.numero}
                              className={styles.input_n}
                            />
                          </label>

                          <label htmlFor="">
                            {" "}
                            Bairro:
                            <input
                              style={{ color: "#aaa3aa" }}
                              value={listEnderecoClinica?.bairro}
                              className={styles.input_bairro}
                            />
                          </label>
                          <label htmlFor="">
                            Cidade:
                            <input
                              style={{ color: "#aaa3aa" }}
                              value={listEnderecoClinica?.localidade}
                              className={styles.input_cidade}
                            />
                          </label>
                        </>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: "30px" }}>
                      {editMode ? (
                        <button
                          onClick={PutPerfilClinica}
                          className={styles.btn}
                        >
                          Salvar
                        </button>
                      ) : (
                        <button
                          className={styles.btn}
                          onClick={() => setEditMode(true)}
                        >
                          Editar
                        </button>
                      )}
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
