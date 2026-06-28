module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  const { salario, limite, totalGastos, totalContas, gastosPorCategoria, historicoResumo, contasFixas } = req.body || {};

  const gastosCats = Object.entries(gastosPorCategoria || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([cat, val]) => `${cat}: R$${Number(val).toFixed(2)}`)
    .join(', ');

  const historicoStr = (historicoResumo || [])
    .map(h => `${h.mes}: R$${Number(h.total).toFixed(2)}`)
    .join(' | ');

  const totalMes = (totalGastos || 0) + (totalContas || 0);
  const pctSalario = salario > 0 ? Math.round((totalMes / salario) * 100) : 0;

  const prompt = `Você é um consultor financeiro pessoal. Analise os dados reais abaixo e crie um plano prático e personalizado.

DADOS DO USUÁRIO:
- Salário: R$${Number(salario || 0).toFixed(2)}
- Limite definido: R$${Number(limite || 0).toFixed(2)}
- Total gasto este mês: R$${Number(totalGastos || 0).toFixed(2)}
- Total em contas este mês: R$${Number(totalContas || 0).toFixed(2)}
- Total mês (gastos + contas): R$${totalMes.toFixed(2)} (${pctSalario}% do salário)
- Top categorias: ${gastosCats || 'sem dados'}
- Histórico: ${historicoStr || 'sem histórico'}
- Contas fixas: ${(contasFixas || []).join(', ') || 'nenhuma'}

Responda EXATAMENTE neste formato (sem introdução, sem encerramento):

**Diagnóstico**
[2-3 linhas analisando a situação real com os números acima]

**3 Metas para o Próximo Mês**
1. [meta específica com valor em reais]
2. [meta específica com valor em reais]
3. [meta específica com valor em reais]

**Ação Imediata**
[1 ação concreta que o usuário pode fazer hoje ou amanhã]

Use os números reais. Seja direto. Máximo 160 palavras.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Claude API error:', response.status, err);
      return res.status(502).json({ error: 'Erro na IA' });
    }

    const data = await response.json();
    const plano = data.content?.[0]?.text || '';
    res.status(200).json({ plano });
  } catch (e) {
    console.error('plano handler error:', e);
    res.status(500).json({ error: 'Erro ao gerar plano' });
  }
};
