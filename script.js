// Variáveis globais
let dadosEntrevista = {};
let dadosTerapeuta = {};
let scoresFuncoes = {atencao: 0, fuga: 0, tangiveis: 0, automatico: 0};
let funcaoPredominante = '';
let registrosFrequencia = [];
let configuracaoColeta = {};

// Função para mostrar/ocultar abas
function showTab(tabName) {
    console.log('Mudando para aba:', tabName);
    
    // Ocultar todas as abas
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => content.classList.add('hidden'));
    
    // Remover classe active de todas as abas
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Mostrar aba selecionada
    const targetContent = document.getElementById(tabName);
    if (targetContent) {
        targetContent.classList.remove('hidden');
    }
    
    // Ativar tab correspondente
    const tabButtons = document.querySelectorAll('.tab');
    const tabTexts = ['Entrevista', 'Avaliação Funcional', 'Coleta de Dados', 'Recomendações', 'Relatório'];
    const tabIds = ['entrevista', 'avaliacao', 'coleta', 'recomendacoes', 'relatorio'];
    
    const tabIndex = tabIds.indexOf(tabName);
    if (tabIndex !== -1 && tabButtons[tabIndex]) {
        tabButtons[tabIndex].classList.add('active');
    }
    
    // Gerar conteúdo específico para certas abas
    if (tabName === 'recomendacoes') {
        gerarRecomendacoes();
    } else if (tabName === 'relatorio') {
        gerarRelatorio();
    }
}

// Função para coletar dados do terapeuta
function coletarDadosTerapeuta() {
    dadosTerapeuta = {
        nome: document.getElementById('terapeutaNome')?.value || '',
        profissao: document.getElementById('terapeutaProfissao')?.value || '',
        especializacao: document.getElementById('terapeutaEspecializacao')?.value || '',
        registro: document.getElementById('terapeutaRegistro')?.value || '',
        instituicao: document.getElementById('terapeutaInstituicao')?.value || '',
        contato: document.getElementById('terapeutaContato')?.value || '',
        experiencia: document.getElementById('terapeutaExperiencia')?.value || '',
        formacao: document.getElementById('terapeutaFormacao')?.value || '',
        supervisao: document.getElementById('terapeutaSupervisao')?.value || '',
        observacoes: document.getElementById('terapeutaObservacoes')?.value || ''
    };
    console.log('Dados do terapeuta coletados:', dadosTerapeuta);
}

// Função para coletar dados da entrevista
function coletarDadosEntrevista() {
    dadosEntrevista = {
        nome: document.getElementById('nome')?.value || '',
        idade: parseInt(document.getElementById('idade')?.value) || 0,
        nivelTEA: document.getElementById('nivelTEA')?.value || '',
        medicacao: document.getElementById('medicacao')?.value || '',
        informante: document.getElementById('informante')?.value || '',
        comportamento: document.getElementById('comportamento')?.value || '',
        frequencia: document.getElementById('frequencia')?.value || '',
        duracao: document.getElementById('duracao')?.value || '',
        intensidade: document.getElementById('intensidade')?.value || '',
        riscoSeguranca: document.getElementById('riscoSeguranca')?.value || '',
        impactoAprendizado: document.getElementById('impactoAprendizado')?.value || '',
        nivelComunicacao: document.getElementById('nivelComunicacao')?.value || '',
        usoCAA: document.getElementById('usoCAA')?.value || '',
        hipersensibilidade: document.getElementById('hipersensibilidade')?.value || '',
        buscaSensorial: document.getElementById('buscaSensorial')?.value || '',
        tentativasAnteriores: document.getElementById('tentativasAnteriores')?.value || '',
        reforçadores: document.getElementById('reforçadores')?.value || ''
    };
    console.log('Dados da entrevista coletados:', dadosEntrevista);
}

// Função para calcular pontuações das funções
function calcularFuncoes() {
    console.log('Calculando funções...');
    
    // Coletar dados
    coletarDadosEntrevista();
    coletarDadosTerapeuta();
    
    // Calcular pontuação de cada função
    scoresFuncoes.atencao = calcularPontuacaoFuncao('atencao');
    scoresFuncoes.fuga = calcularPontuacaoFuncao('fuga');
    scoresFuncoes.tangiveis = calcularPontuacaoFuncao('tangiveis');
    scoresFuncoes.automatico = calcularPontuacaoFuncao('automatico');
    
    console.log('Scores calculados:', scoresFuncoes);
    
    // Atualizar displays
    document.getElementById('scoreAtencao').textContent = `Pontuação: ${scoresFuncoes.atencao}/12`;
    document.getElementById('scoreFuga').textContent = `Pontuação: ${scoresFuncoes.fuga}/12`;
    document.getElementById('scoreTangiveis').textContent = `Pontuação: ${scoresFuncoes.tangiveis}/12`;
    document.getElementById('scoreAutomatico').textContent = `Pontuação: ${scoresFuncoes.automatico}/12`;
    
    // Determinar função predominante
    determinarFuncaoPredominante();
    
    // Mostrar resultado se alguma pontuação > 0
    if (Math.max(...Object.values(scoresFuncoes)) > 0) {
        mostrarResultadoFuncao();
    }
}

function calcularPontuacaoFuncao(funcao) {
    let total = 0;
    for (let i = 1; i <= 4; i++) {
        const radio = document.querySelector(`input[name="${funcao}${i}"]:checked`);
        if (radio) {
            total += parseInt(radio.value);
        }
    }
    return total;
}

function determinarFuncaoPredominante() {
    const scores = Object.entries(scoresFuncoes);
    scores.sort((a, b) => b[1] - a[1]);
    
    const funcaoNomes = {
        'atencao': 'ATENÇÃO',
        'fuga': 'FUGA/ESQUIVA',
        'tangiveis': 'ACESSO A TANGÍVEIS',
        'automatico': 'REFORÇO AUTOMÁTICO'
    };
    
    funcaoPredominante = funcaoNomes[scores[0][0]];
    console.log('Função predominante:', funcaoPredominante);
}

function mostrarResultadoFuncao() {
    const resultadoDiv = document.getElementById('resultadoFuncao');
    const funcaoDiv = document.getElementById('funcaoPredominante');
    const graficoDiv = document.getElementById('graficoFuncoes');
    
    resultadoDiv.classList.remove('hidden');
    
    funcaoDiv.innerHTML = `
        <h4>Função Comportamental Predominante: ${funcaoPredominante}</h4>
        <p><strong>Pontuação:</strong> ${Math.max(...Object.values(scoresFuncoes))}/12</p>
    `;
    
    // Criar gráfico simples das pontuações
    graficoDiv.innerHTML = `
        <h4>Distribuição das Pontuações:</h4>
        ${Object.entries(scoresFuncoes).map(([funcao, score]) => `
            <div style="margin: 10px 0;">
                <span style="display: inline-block; width: 150px; font-weight: 600;">
                    ${funcao.charAt(0).toUpperCase() + funcao.slice(1)}:
                </span>
                <div style="display: inline-block; width: 200px; background: #e9ecef; border-radius: 10px; overflow: hidden;">
                    <div style="width: ${(score/12)*100}%; height: 20px; background: ${getFunctionColor(funcao)}; border-radius: 10px;"></div>
                </div>
                <span style="margin-left: 10px; font-weight: bold;">${score}/12</span>
            </div>
        `).join('')}
    `;
}

function getFunctionColor(funcao) {
    const colors = {
        'atencao': '#e74c3c',
        'fuga': '#3498db',
        'tangiveis': '#e67e22',
        'automatico': '#4a6741'
    };
    return colors[funcao] || '#6c757d';
}

// FUNÇÕES DE COLETA DE DADOS
function mostrarPeriodoPersonalizado() {
    const select = document.getElementById('periodoColeta');
    const div = document.getElementById('periodoPersonalizado');
    
    if (select && div) {
        if (select.value === 'personalizado') {
            div.style.display = 'block';
        } else {
            div.style.display = 'none';
        }
    }
}

function adicionarRegistro() {
    const data = document.getElementById('dataRegistro').value;
    const frequencia = document.getElementById('frequenciaRegistro').value;
    const observacoes = document.getElementById('observacoesDia').value;
    const periodo = document.getElementById('periodoColeta').value;
    const unidade = document.getElementById('unidadeFrequencia').value;

    // Validações
    if (!data || !frequencia || !periodo || !unidade) {
        alert('Por favor, preencha todos os campos obrigatórios (Data, Frequência, Período e Unidade).');
        return;
    }

    const dataFormatada = new Date(data + 'T00:00:00').toLocaleDateString('pt-BR');
    
    // Verificar se já existe registro para esta data
    const registroExistente = registrosFrequencia.find(r => r.data === data);
    if (registroExistente) {
        if (confirm('Já existe um registro para esta data. Deseja substituir?')) {
            const index = registrosFrequencia.indexOf(registroExistente);
            registrosFrequencia[index] = {
                data: data,
                dataFormatada: dataFormatada,
                frequencia: parseInt(frequencia),
                observacoes: observacoes || 'Nenhuma observação'
            };
        }
    } else {
        registrosFrequencia.push({
            data: data,
            dataFormatada: dataFormatada,
            frequencia: parseInt(frequencia),
            observacoes: observacoes || 'Nenhuma observação'
        });
    }

    // Salvar configuração da coleta
    configuracaoColeta = {
        periodo: periodo,
        unidade: unidade,
        descricaoPersonalizada: document.getElementById('descricaoPeriodo').value
    };

    // Ordenar registros por data
    registrosFrequencia.sort((a, b) => new Date(a.data) - new Date(b.data));

    // Atualizar tabela e estatísticas
    atualizarTabelaRegistros();
    calcularEstatisticas();

    // Limpar campos
    document.getElementById('dataRegistro').value = '';
    document.getElementById('frequenciaRegistro').value = '';
    document.getElementById('observacoesDia').value = '';
}

function removerRegistro(index) {
    if (confirm('Tem certeza que deseja remover este registro?')) {
        registrosFrequencia.splice(index, 1);
        atualizarTabelaRegistros();
        calcularEstatisticas();
    }
}

function atualizarTabelaRegistros() {
    const tbody = document.getElementById('corpoTabelaRegistros');
    
    if (registrosFrequencia.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="padding: 20px; text-align: center; color: #6c757d;">
                    Nenhum registro adicionado ainda
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = registrosFrequencia.map((registro, index) => `
        <tr>
            <td>${registro.dataFormatada}</td>
            <td style="text-align: center; font-weight: bold; color: #4a6741;">${registro.frequencia}</td>
            <td>${registro.observacoes}</td>
            <td style="text-align: center;">
                <button onclick="removerRegistro(${index})" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">
                    Remover
                </button>
            </td>
        </tr>
    `).join('');
}

function calcularEstatisticas() {
    const resumoDiv = document.getElementById('resumoEstatistico');
    
    if (registrosFrequencia.length === 0) {
        resumoDiv.style.display = 'none';
        return;
    }

    resumoDiv.style.display = 'block';

    const frequencias = registrosFrequencia.map(r => r.frequencia);
    const media = frequencias.reduce((a, b) => a + b, 0) / frequencias.length;
    const maiorValor = Math.max(...frequencias);
    const menorValor = Math.min(...frequencias);

    document.getElementById('mediaFrequencia').textContent = media.toFixed(1);
    document.getElementById('totalDias').textContent = registrosFrequencia.length;
    document.getElementById('maiorValor').textContent = maiorValor;
    document.getElementById('menorValor').textContent = menorValor;
}

// FUNÇÕES DE RECOMENDAÇÕES
function gerarRecomendacoes() {
    console.log('Gerando recomendações...');
    
    coletarDadosEntrevista();
    coletarDadosTerapeuta();
    
    // Verificar se há função predominante definida
    if (!funcaoPredominante) {
        determinarFuncaoPredominante();
    }
    
    // Gerar alertas de segurança
    gerarAlertasSeguranca();
    
    // Gerar resumo da análise
    gerarResumoAnalise();
    
    // Gerar procedimentos básicos
    gerarProcedimentosBasicos();
    
    // Gerar cronograma
    gerarCronograma();
    
    // Gerar lista de recursos
    gerarRecursos();
}

function gerarAlertasSeguranca() {
    const alertasDiv = document.getElementById('alertasSeguranca');
    let alertas = [];
    
    if (dadosEntrevista.riscoSeguranca === 'alto') {
        alertas.push({
            tipo: 'danger',
            texto: 'ALERTA: Comportamento de alto risco identificado. Supervisão 1:1 recomendada durante implementação.'
        });
    }
    
    if (dadosEntrevista.medicacao && dadosEntrevista.medicacao.toLowerCase() !== 'nenhuma') {
        alertas.push({
            tipo: 'warning',
            texto: 'Criança em uso de medicação. Coordenar intervenções com o prescritor.'
        });
    }
    
    if (dadosEntrevista.intensidade === 'extrema') {
        alertas.push({
            tipo: 'warning',
            texto: 'Intensidade extrema detectada. Considerar avaliação médica complementar.'
        });
    }
    
    alertasDiv.innerHTML = alertas.map(alerta => `
        <div class="alert alert-${alerta.tipo}">
            ${alerta.texto}
        </div>
    `).join('');
}

function gerarResumoAnalise() {
    const resumoDiv = document.getElementById('resumoAnalise');
    
    resumoDiv.innerHTML = `
        <div class="recommendation-card">
            <h4>Resumo da Análise Funcional</h4>
            <p><strong>Criança:</strong> ${dadosEntrevista.nome || 'Não informado'} (${dadosEntrevista.idade || 'N/A'} anos)</p>
            <p><strong>Função Predominante:</strong> ${funcaoPredominante || 'Não definida'} (${Math.max(...Object.values(scoresFuncoes))}/12 pontos)</p>
            <p><strong>Comportamento:</strong> ${dadosEntrevista.comportamento || 'Não descrito'}</p>
            <p><strong>Frequência:</strong> ${getFrequenciaTexto(dadosEntrevista.frequencia)}</p>
            <p><strong>Intensidade:</strong> ${dadosEntrevista.intensidade || 'Não informada'}</p>
            <p><strong>Comunicação:</strong> ${getComunicacaoTexto(dadosEntrevista.nivelComunicacao)}</p>
            <p><strong>Terapeuta Responsável:</strong> ${dadosTerapeuta.nome || 'Não informado'}</p>
        </div>
    `;
}

function gerarProcedimentosBasicos() {
    const procedimentosDiv = document.getElementById('procedimentosRecomendados');
    
    let procedimentos = [];
    
    if (funcaoPredominante && funcaoPredominante.includes('ATENÇÃO')) {
        procedimentos = [
            {
                nome: "Atenção Programada + Treino de Comunicação Funcional",
                descricao: "Fornecer atenção em intervalos regulares e ensinar formas adequadas de solicitar atenção",
                recursos: ["Timer visual", "Materiais de comunicação funcional", "Sistema de reforço"]
            }
        ];
    } else if (funcaoPredominante && funcaoPredominante.includes('FUGA')) {
        procedimentos = [
            {
                nome: "Treino de Comunicação Funcional 'Pausa'",
                descricao: "Treinar formas funcionais de solicitar pausas ou ajuda durante demandas",
                recursos: ["Materiais de comunicação funcional", "Timer para pausas", "Atividades de baixa demanda"]
            }
        ];
    } else if (funcaoPredominante && funcaoPredominante.includes('TANGÍVEIS')) {
        procedimentos = [
            {
                nome: "Treino de Comunicação Funcional 'Eu Quero'",
                descricao: "Treinar comunicação funcional para solicitar itens preferidos de forma adequada",
                recursos: ["Materiais de comunicação funcional", "Cronograma visual", "Suportes visuais"]
            }
        ];
    } else if (funcaoPredominante && funcaoPredominante.includes('AUTOMÁTICO')) {
        procedimentos = [
            {
                nome: "Atividades Sensoriais Alternativas",
                descricao: "Fornecer alternativas sensoriais adequadas que atendam à mesma necessidade",
                recursos: ["Materiais sensoriais", "Cronograma de atividades", "Área sensorial"]
            }
        ];
    }
    
    if (procedimentos.length > 0) {
        procedimentosDiv.innerHTML = `
            <div class="section">
                <h3>Procedimentos Recomendados</h3>
                ${procedimentos.map((proc, index) => `
                    <div class="recommendation-card">
                        <h4>${index + 1}. ${proc.nome}</h4>
                        <p><strong>Descrição:</strong> ${proc.descricao}</p>
                        <p><strong>Recursos necessários:</strong> ${proc.recursos.join(', ')}</p>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        procedimentosDiv.innerHTML = `
            <div class="section">
                <h3>Procedimentos Recomendados</h3>
                <div class="recommendation-card">
                    <h4>Recomendações Gerais</h4>
                    <p>Baseado na análise realizada, recomenda-se:</p>
                    <ul>
                        <li>Consultar um analista do comportamento para avaliação mais detalhada</li>
                        <li>Implementar estratégias gerais de manejo comportamental</li>
                        <li>Monitorar comportamento por período adicional</li>
                    </ul>
                </div>
            </div>
        `;
    }
}

function gerarCronograma() {
    const cronogramaDiv = document.getElementById('cronogramaImplementacao');
    
    cronogramaDiv.innerHTML = `
        <div class="recommendation-card">
            <h4>Cronograma de Implementação</h4>
            <div style="margin: 15px 0;">
                <strong>Semana 1-2:</strong> Implementação inicial e adaptação
            </div>
            <div style="margin: 15px 0;">
                <strong>Semana 3-4:</strong> Monitoramento e ajustes finos
            </div>
            <div style="margin: 15px 0;">
                <strong>Semana 5+:</strong> Manutenção e generalização
            </div>
            <div style="margin-top: 20px; padding: 15px; background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%); border-radius: 8px; border-left: 4px solid #4a6741;">
                <strong>Critério de Sucesso:</strong> Redução de 50% no comportamento-problema em 4 semanas
            </div>
        </div>
    `;
}

function gerarRecursos() {
    const recursosDiv = document.getElementById('recursosNecessarios');
    
    recursosDiv.innerHTML = `
        <div class="recommendation-card">
            <h4>Lista de Recursos Necessários</h4>
            <ul style="margin: 15px 0; padding-left: 20px;">
                <li>Materiais de comunicação visual</li>
                <li>Sistema de reforçamento</li>
                <li>Cronograma visual</li>
                <li>Timer ou cronômetro</li>
                <li>Materiais específicos conforme função identificada</li>
            </ul>
            <div style="margin-top: 15px; padding: 10px; background: linear-gradient(135deg, #fef9e7 0%, #f6f1d1 100%); border-radius: 8px; border-left: 4px solid #e67e22;">
                <strong>Estimativa de custo:</strong> R$ 100-400 (dependendo dos materiais específicos)
            </div>
        </div>
    `;
}

// FUNÇÃO PARA GERAR RELATÓRIO
function gerarRelatorio() {
    console.log('Gerando relatório...');
    
    const relatorioDiv = document.getElementById('relatorioCompleto');
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    
    // Garantir que os dados foram coletados
    coletarDadosEntrevista();
    coletarDadosTerapeuta();
    
    relatorioDiv.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 10px;">
            <div style="text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 30px;">
                <h2 style="color: #4a6741; margin-bottom: 15px;">RELATÓRIO DE AVALIAÇÃO FUNCIONAL E PLANO DE INTERVENÇÃO</h2>
                <p><strong>Data:</strong> ${dataAtual}</p>
                <p><strong>Criança:</strong> ${dadosEntrevista.nome || 'Não informado'} (${dadosEntrevista.idade || 'N/A'} anos)</p>
                <p><strong>Informante:</strong> ${getInformanteTexto(dadosEntrevista.informante)}</p>
            </div>

            ${gerarSecaoTerapeuta()}
            
            <div style="margin-bottom: 30px;">
                <h3 style="color: #4a6741; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 15px;">1. DESCRIÇÃO DO COMPORTAMENTO</h3>
                <p><strong>Topografia:</strong> ${dadosEntrevista.comportamento || 'Não descrito'}</p>
                <p><strong>Frequência:</strong> ${getFrequenciaTexto(dadosEntrevista.frequencia)}</p>
                <p><strong>Duração:</strong> ${getDuracaoTexto(dadosEntrevista.duracao)}</p>
                <p><strong>Intensidade:</strong> ${dadosEntrevista.intensidade || 'Não informada'}</p>
                <p><strong>Risco de Segurança:</strong> ${getRiscoTexto(dadosEntrevista.riscoSeguranca)}</p>
                <p><strong>Impacto no Aprendizado:</strong> ${getImpactoTexto(dadosEntrevista.impactoAprendizado)}</p>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h3 style="color: #4a6741; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 15px;">2. PERFIL DA CRIANÇA</h3>
                <p><strong>Nível TEA:</strong> ${getNivelTEATexto(dadosEntrevista.nivelTEA)}</p>
                <p><strong>Comunicação:</strong> ${getComunicacaoTexto(dadosEntrevista.nivelComunicacao)}</p>
                <p><strong>Uso de CAA:</strong> ${getCAATexto(dadosEntrevista.usoCAA)}</p>
                <p><strong>Perfil Sensorial:</strong> ${getPerfilSensorialTexto()}</p>
                <p><strong>Medicações:</strong> ${dadosEntrevista.medicacao || 'Nenhuma informada'}</p>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h3 style="color: #4a6741; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 15px;">3. ANÁLISE FUNCIONAL</h3>
                <p><strong>Função Predominante:</strong> ${funcaoPredominante || 'Não definida'} (${Math.max(...Object.values(scoresFuncoes))}/12 pontos)</p>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #4a6741;">
                    <h4 style="text-align: center; margin-bottom: 15px; color: #4a6741;">Distribuição das Pontuações</h4>
                    ${Object.entries(scoresFuncoes).map(([funcao, score]) => {
                        const colors = {
                            'atencao': '#e74c3c',
                            'fuga': '#3498db', 
                            'tangiveis': '#e67e22',
                            'automatico': '#4a6741'
                        };
                        const nomes = {
                            'atencao': 'Atenção',
                            'fuga': 'Fuga/Esquiva',
                            'tangiveis': 'Acesso a Tangíveis',
                            'automatico': 'Reforço Automático'
                        };
                        return `
                            <div style="margin-bottom: 15px;">
                                <div style="display: flex; align-items: center; margin-bottom: 5px; justify-content: space-between;">
                                    <span style="font-weight: 600; color: #4a6741; min-width: 140px;">
                                        ${nomes[funcao]}:
                                    </span>
                                    <span style="font-weight: bold; color: #e67e22;">${score}/12 (${Math.round((score/12)*100)}%)</span>
                                </div>
                                <div style="width: 100%; height: 20px; background: #e9ecef; border-radius: 10px; overflow: hidden; margin: 5px 0;">
                                    <div style="width: ${(score/12)*100}%; height: 100%; background: ${colors[funcao]}; border-radius: 8px;"></div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h3 style="color: #4a6741; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 15px;">4. HIPÓTESE FUNCIONAL</h3>
                <div style="background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%); padding: 20px; border-radius: 10px; border-left: 4px solid #4a6741; font-style: italic;">
                    <strong>Hipótese:</strong> O comportamento "${dadosEntrevista.comportamento || 'descrito'}" 
                    é mantido por ${getHipoteseConsequencia(funcaoPredominante)}, 
                    resultando em impacto nas atividades diárias e no aprendizado.
                </div>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h3 style="color: #4a6741; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 15px;">5. RECOMENDAÇÕES</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 4px solid #e67e22;">
                    <h4>Estratégias Recomendadas</h4>
                    <p>Baseado na função identificada (<strong>${funcaoPredominante}</strong>), recomenda-se:</p>
                    <ul>
                        <li>Implementar treino de comunicação funcional</li>
                        <li>Estabelecer rotina estruturada e previsível</li>
                        <li>Monitorar comportamento sistematicamente</li>
                        <li>Coordenar com equipe multidisciplinar</li>
                    </ul>
                </div>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h3 style="color: #4a6741; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 15px;">6. OBSERVAÇÕES IMPORTANTES</h3>
                <div style="background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%); padding: 20px; border-radius: 10px; border-left: 4px solid #ff9800; white-space: pre-line;">
                    ${getObservacoesImportantes()}
                </div>
            </div>
            
            <div style="margin: 20px 0; padding: 20px; background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%); border-radius: 10px; border-left: 4px solid #4a6741; text-align: center;">
                <p style="color: #4a6741; font-size: 16px; margin-bottom: 8px;"><strong>Sistema de Avaliação Funcional TEA</strong></p>
                <p style="font-size: 13px; color: #666; margin-bottom: 15px;"><em>Baseado em: FAI (O'Neill et al.), QABF (Matson & Vollmer), FAST (Iwata & DeLeon)</em></p>
                
                <div>
                    <p style="color: #4a6741; font-weight: 600; margin-bottom: 5px;">
                        Idealizado e desenvolvido por:
                    </p>
                    <p style="color: #e67e22; font-weight: bold; font-size: 1.2em; margin: 5px 0;">Daniel Barbosa</p>
                    <p style="color: #4a6741; font-style: italic; margin-top: 5px;">
                        Psicólogo e Analista do Comportamento
                    </p>
                </div>
                
                <p style="font-size: 12px; color: #888; margin-top: 15px;">Data: ${dataAtual} | © 2025 - Todos os direitos reservados</p>
            </div>
        </div>
    `;
}

// Função para gerar seção do terapeuta no relatório
function gerarSecaoTerapeuta() {
    if (!dadosTerapeuta.nome && !dadosTerapeuta.profissao) {
        return `
            <div class="terapeuta-info-relatorio">
                <h4>Terapeuta Responsável</h4>
                <p style="text-align: center; color: #6c757d; font-style: italic;">
                    Informações do terapeuta não foram preenchidas
                </p>
            </div>
        `;
    }

    return `
        <div class="terapeuta-info-relatorio">
            <h4>Terapeuta Responsável pela Avaliação</h4>
            <div class="terapeuta-dados">
                ${dadosTerapeuta.nome ? `<p><strong>Nome:</strong> ${dadosTerapeuta.nome}</p>` : ''}
                ${dadosTerapeuta.profissao ? `<p><strong>Profissão:</strong> ${getProfissaoTexto(dadosTerapeuta.profissao)}</p>` : ''}
                ${dadosTerapeuta.especializacao ? `<p><strong>Especialização:</strong> ${dadosTerapeuta.especializacao}</p>` : ''}
                ${dadosTerapeuta.registro ? `<p><strong>Registro Profissional:</strong> ${dadosTerapeuta.registro}</p>` : ''}
                ${dadosTerapeuta.instituicao ? `<p><strong>Instituição:</strong> ${dadosTerapeuta.instituicao}</p>` : ''}
                ${dadosTerapeuta.contato ? `<p><strong>Contato:</strong> ${dadosTerapeuta.contato}</p>` : ''}
                ${dadosTerapeuta.experiencia ? `<p><strong>Experiência com TEA:</strong> ${getExperienciaTexto(dadosTerapeuta.experiencia)}</p>` : ''}
                ${dadosTerapeuta.formacao ? `<p><strong>Formação Específica:</strong> ${getFormacaoTexto(dadosTerapeuta.formacao)}</p>` : ''}
                ${dadosTerapeuta.supervisao ? `<p><strong>Supervisão:</strong> ${getSupervisaoTexto(dadosTerapeuta.supervisao)}</p>` : ''}
            </div>
            ${dadosTerapeuta.observacoes ? `
                <div style="margin-top: 15px; padding: 10px; background: rgba(255,255,255,0.8); border-radius: 5px; border-left: 3px solid #4a6741;">
                    <strong>Observações:</strong> ${dadosTerapeuta.observacoes}
                </div>
            ` : ''}
        </div>
    `;
}

// FUNÇÕES AUXILIARES PARA TEXTOS

// Funções auxiliares para textos do terapeuta
function getProfissaoTexto(prof) {
    const textos = {
        'psicologo': 'Psicólogo(a)',
        'terapeuta_ocupacional': 'Terapeuta Ocupacional',
        'fonoaudiologo': 'Fonoaudiólogo(a)',
        'pedagogo': 'Pedagogo(a)',
        'psicopedagogo': 'Psicopedagogo(a)',
        'neuropsicologo': 'Neuropsicólogo(a)',
        'analista_comportamento': 'Analista do Comportamento',
        'outro': 'Outro'
    };
    return textos[prof] || prof;
}

function getExperienciaTexto(exp) {
    const textos = {
        'menos_1_ano': 'Menos de 1 ano',
        '1_3_anos': '1 a 3 anos',
        '3_5_anos': '3 a 5 anos',
        '5_10_anos': '5 a 10 anos',
        'mais_10_anos': 'Mais de 10 anos'
    };
    return textos[exp] || exp;
}

function getFormacaoTexto(form) {
    const textos = {
        'especializacao': 'Especialização',
        'pos_graduacao': 'Pós-graduação',
        'mestrado': 'Mestrado',
        'doutorado': 'Doutorado',
        'cursos_livres': 'Cursos livres',
        'certificacao_internacional': 'Certificação Internacional',
        'nenhuma': 'Nenhuma formação específica'
    };
    return textos[form] || form;
}

function getSupervisaoTexto(sup) {
    const textos = {
        'sim_semanal': 'Sim - Semanal',
        'sim_quinzenal': 'Sim - Quinzenal',
        'sim_mensal': 'Sim - Mensal',
        'sim_eventual': 'Sim - Eventual',
        'nao': 'Não recebe supervisão'
    };
    return textos[sup] || sup;
}

// Funções auxiliares para textos gerais
function getFrequenciaTexto(freq) {
    const textos = {
        'varias_hora': 'Várias vezes por hora',
        'varias_dia': 'Várias vezes por dia',
        'diariamente': 'Diariamente',
        'algumas_semana': 'Algumas vezes por semana',
        'raramente': 'Raramente'
    };
    return textos[freq] || 'Não informada';
}

function getDuracaoTexto(dur) {
    const textos = {
        'segundos': 'Segundos',
        '1-5min': '1-5 minutos',
        '5-30min': '5-30 minutos',
        'mais30min': 'Mais de 30 minutos'
    };
    return textos[dur] || 'Não informada';
}

function getComunicacaoTexto(com) {
    const textos = {
        'nao_verbal': 'Não-verbal',
        'palavras_isoladas': 'Palavras isoladas',
        'frases_simples': 'Frases simples',
        'conversacao': 'Conversação'
    };
    return textos[com] || 'Não informado';
}

function getNivelTEATexto(nivel) {
    const textos = {
        '1': 'Nível 1 - Necessita de apoio',
        '2': 'Nível 2 - Necessita de apoio substancial',
        '3': 'Nível 3 - Necessita de apoio muito substancial'
    };
    return textos[nivel] || 'Não informado';
}

function getCAATexto(caa) {
    const textos = {
        'nao': 'Não usa',
        'pecs': 'PECS',
        'gestos': 'Gestos',
        'aplicativo': 'Aplicativo',
        'outro': 'Outro'
    };
    return textos[caa] || 'Não informado';
}

function getRiscoTexto(risco) {
    const textos = {
        'nenhum': 'Nenhum',
        'baixo': 'Baixo',
        'moderado': 'Moderado',
        'alto': 'Alto'
    };
    return textos[risco] || 'Não informado';
}

function getImpactoTexto(impacto) {
    const textos = {
        'nao': 'Não interfere',
        'as_vezes': 'Interfere às vezes',
        'frequentemente': 'Interfere frequentemente',
        'sempre': 'Sempre interfere'
    };
    return textos[impacto] || 'Não informado';
}

function getInformanteTexto(informante) {
    const textos = {
        'mae': 'Mãe',
        'pai': 'Pai',
        'cuidador': 'Cuidador',
        'professor': 'Professor',
        'terapeuta': 'Terapeuta',
        'outro': 'Outro'
    };
    return textos[informante] || 'Não informado';
}

function getPerfilSensorialTexto() {
    const hiper = dadosEntrevista.hipersensibilidade;
    const busca = dadosEntrevista.buscaSensorial;
    
    let texto = '';
    if (hiper && hiper !== 'nenhuma') {
        texto += `Hipersensibilidade ${hiper}`;
    }
    if (busca && busca !== 'nenhuma') {
        if (texto) texto += ', ';
        texto += `Busca sensorial ${busca}`;
    }
    
    return texto || 'Sem alterações sensoriais reportadas';
}

function getHipoteseConsequencia(funcao) {
    const consequencias = {
        'ATENÇÃO': 'obtenção de atenção social (positiva ou negativa)',
        'FUGA/ESQUIVA': 'fuga ou evitação de demandas/situações aversivas',
        'ACESSO A TANGÍVEIS': 'acesso a itens ou atividades preferidas',
        'REFORÇO AUTOMÁTICO': 'autorregulação sensorial ou estimulação interna'
    };
    return consequencias[funcao] || 'reforçamento não identificado claramente';
}

function getObservacoesImportantes() {
    let observacoes = [];
    
    if (dadosEntrevista.riscoSeguranca === 'alto') {
        observacoes.push('• Supervisão constante necessária devido ao alto risco de segurança');
    }
    
    if (dadosEntrevista.medicacao && dadosEntrevista.medicacao.toLowerCase() !== 'nenhuma') {
        observacoes.push('• Coordenação com prescritor necessária devido ao uso de medicação');
    }
    
    if (dadosEntrevista.intensidade === 'extrema') {
        observacoes.push('• Considerar avaliação médica adicional devido à intensidade extrema');
    }
    
    if (dadosTerapeuta.supervisao === 'nao') {
        observacoes.push('• Recomenda-se buscar supervisão especializada para o terapeuta responsável');
    }
    
    if (dadosTerapeuta.experiencia === 'menos_1_ano') {
        observacoes.push('• Devido à menor experiência do terapeuta, considerar supervisão mais frequente');
    }
    
    if (observacoes.length === 0) {
        observacoes.push('• Implementar plano conforme descrito, monitorando progresso regularmente');
    }
    
    return observacoes.join('\n');
}

// FUNÇÕES DE EXPORTAÇÃO E RESET
function exportarPDF() {
    console.log('Exportando PDF...');
    const relatorio = document.getElementById('relatorioCompleto').innerHTML;
    const janela = window.open('', '_blank');
    
    janela.document.write(`
        <html>
        <head>
            <title>Relatório de Avaliação Funcional - ${dadosEntrevista.nome || 'TEA'}</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    margin: 20px; 
                    line-height: 1.6; 
                    background: white;
                }
                h2, h3, h4 { 
                    color: #4a6741; 
                    page-break-after: avoid;
                }
                h2 {
                    border-bottom: 2px solid #4a6741;
                    padding-bottom: 10px;
                }
                h3 {
                    border-bottom: 1px solid #e2e8f0;
                    padding-bottom: 8px;
                    margin-top: 25px;
                }
                .terapeuta-info-relatorio { 
                    background: #fff3e0; 
                    padding: 20px; 
                    border-left: 4px solid #e67e22; 
                    margin: 20px 0;
                    page-break-inside: avoid;
                }
                .terapeuta-dados {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 10px;
                }
                .terapeuta-dados p {
                    background: rgba(255,255,255,0.7);
                    padding: 8px;
                    border-radius: 4px;
                    margin: 4px 0;
                }
                div[style*="background: #f8f9fa"] { 
                    background: #f8f9fa !important; 
                    padding: 20px; 
                    border-left: 4px solid #4a6741;
                    page-break-inside: avoid;
                }
                div[style*="background: linear-gradient(135deg, #e8f5e8"] { 
                    background: #e8f5e8 !important; 
                    padding: 20px; 
                    border-left: 4px solid #4a6741;
                    page-break-inside: avoid;
                }
                div[style*="background: linear-gradient(135deg, #fff8e1"] { 
                    background: #fff8e1 !important; 
                    padding: 20px; 
                    border-left: 4px solid #ff9800;
                    page-break-inside: avoid;
                }
                div[style*="border-left: 4px solid #e67e22"] {
                    background: #f8f9fa !important;
                    page-break-inside: avoid;
                }
                table {
                    border-collapse: collapse;
                    width: 100%;
                    margin: 15px 0;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background: #4a6741;
                    color: white;
                }
                .barra-progresso {
                    width: 100%;
                    height: 20px;
                    background: #e9ecef !important;
                    border-radius: 10px;
                    margin: 5px 0;
                }
                @media print {
                    body { margin: 10mm; }
                    * { 
                        -webkit-print-color-adjust: exact !important;
                        color-adjust: exact !important;
                    }
                }
            </style>
        </head>
        <body>
            ${relatorio}
        </body>
        </html>
    `);
    
    janela.document.close();
    setTimeout(() => {
        janela.print();
    }, 1000);
}

function novaAvaliacao() {
    if (confirm('Tem certeza que deseja iniciar uma nova avaliação? Todos os dados atuais serão perdidos.')) {
        console.log('Iniciando nova avaliação...');
        
        // Limpar todos os campos de input
        document.querySelectorAll('input, select, textarea').forEach(campo => {
            if (campo.type === 'radio' || campo.type === 'checkbox') {
                campo.checked = false;
            } else {
                campo.value = '';
            }
        });
        
        // Resetar todas as variáveis globais
        dadosEntrevista = {};
        dadosTerapeuta = {};
        scoresFuncoes = {atencao: 0, fuga: 0, tangiveis: 0, automatico: 0};
        funcaoPredominante = '';
        registrosFrequencia = [];
        configuracaoColeta = {};
        
        // Resetar displays de pontuação
        document.getElementById('scoreAtencao').textContent = 'Pontuação: 0/12';
        document.getElementById('scoreFuga').textContent = 'Pontuação: 0/12';
        document.getElementById('scoreTangiveis').textContent = 'Pontuação: 0/12';
        document.getElementById('scoreAutomatico').textContent = 'Pontuação: 0/12';
        
        // Ocultar seções de resultado
        document.getElementById('resultadoFuncao').classList.add('hidden');
        document.getElementById('resumoEstatistico').style.display = 'none';
        
        // Resetar tabela de registros
        atualizarTabelaRegistros();
        
        // Limpar conteúdo das abas de recomendações e relatório
        document.getElementById('alertasSeguranca').innerHTML = '';
        document.getElementById('resumoAnalise').innerHTML = '';
        document.getElementById('procedimentosRecomendados').innerHTML = '';
        document.getElementById('cronogramaImplementacao').innerHTML = '';
        document.getElementById('recursosNecessarios').innerHTML = '';
        document.getElementById('relatorioCompleto').innerHTML = '';
        
        // Voltar para primeira aba
        showTab('entrevista');
        
        console.log('Nova avaliação iniciada com sucesso!');
    }
}

// INICIALIZAÇÃO DO SISTEMA
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de Avaliação Funcional TEA carregado!');
    
    // Mostrar primeira aba por padrão
    showTab('entrevista');
    
    // Configurar data padrão para hoje no campo de registro
    const hoje = new Date().toISOString().split('T')[0];
    const dataRegistroField = document.getElementById('dataRegistro');
    if (dataRegistroField) {
        dataRegistroField.value = hoje;
    }
    
    console.log('Inicialização completa!');
});

// FUNÇÕES DE DEBUGGING (para desenvolvimento)
window.debugSistema = function() {
    console.log('=== DEBUG DO SISTEMA ===');
    console.log('Dados da Entrevista:', dadosEntrevista);
    console.log('Dados do Terapeuta:', dadosTerapeuta);
    console.log('Scores das Funções:', scoresFuncoes);
    console.log('Função Predominante:', funcaoPredominante);
    console.log('Registros de Frequência:', registrosFrequencia);
    console.log('Configuração de Coleta:', configuracaoColeta);
};

// Adicionar event listeners para melhor UX
document.addEventListener('change', function(e) {
    // Auto-save quando campos importantes mudam
    if (e.target.id === 'nome' || e.target.id === 'comportamento') {
        coletarDadosEntrevista();
    }
    if (e.target.id === 'terapeutaNome' || e.target.id === 'terapeutaProfissao') {
        coletarDadosTerapeuta();
    }
});

// Prevenir perda de dados ao sair da página
window.addEventListener('beforeunload', function(e) {
    if (dadosEntrevista.nome || dadosTerapeuta.nome || registrosFrequencia.length > 0) {
        e.preventDefault();
        e.returnValue = 'Você tem dados não salvos. Tem certeza que deseja sair?';
    }
});

console.log('Sistema de Avaliação Funcional TEA - JavaScript carregado completamente!');