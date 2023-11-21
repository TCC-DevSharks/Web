import React, { useState, useEffect } from 'react';
import styles from './Agenda.module.scss';
import TituloSecao from '../../../components/tituloSection/TituloSecao';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios';
import {format} from 'date-fns';


export default function Agenda() {

    function convertToDate(value) {
        if (value instanceof Date) {
            return value;
        } else {
            return new Date(value);
        }
    }

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const IdMedico = localStorage.getItem("id");
        axios.get(`http://10.107.144.6:3000/profissional/gestante/${IdMedico}`)
            .then(response => {
                console.log('Resposta da API:', response.data);

                const eventos = response.data.pacientes.map(paciente => {
                    const diaDesformatado = paciente.diaDesformatado;
                    console.log('dia desformatado:', diaDesformatado);
                    return {
                        id: paciente.idConsulta,
                        title: paciente.nome,
                        start: paciente.diaDesformatado,
                        end: paciente.diaDesformatado,
                    };
                });

                setEvents(eventos);

            })
            .catch(error => {
                console.error('Erro ao obter os eventos: ', error);
            });
    }, []);
    return (
        <div>
            <span>teste</span>
            <div className={styles['agenda-container']}>
                <TituloSecao title="Agenda" />
                <div className={styles["calendario-container"]}>
                    <div className={styles["calendario"]}>
                        <Fullcalendar
                            locale={'pt-br'}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            initialView={"dayGridMonth"}
                            headerToolbar={{
                                start: "today prev,next",
                                center: "title",
                                end: "dayGridMonth,timeGridWeek,timeGridDay",
                            }}
                            height={"50vh"}
                            timeZone="America/Sao_Paulo"
                            events={events}
                        />
                    </div>
                    <div className={styles['compromissos']}>
                        {events.map(evento => (
                            <div className={styles['compromisso']} key={evento.id}>
                                <div className={styles['dia']}>
                                    <p>{convertToDate(evento.start).getDate() + 1}</p>
                                </div>
                                <div className={styles['consulta']}>
                                    <div className={styles['hora-paciente']}>
                                        <p className={styles['hora']}>
                                            {format(convertToDate(evento.start), 'HH:mm', { timeZone: 'America/Sao_Paulo' })} -
                                        </p>
                                        <p className={styles['paciente']}>{evento.title}</p>
                                    </div>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

