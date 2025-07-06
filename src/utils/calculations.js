// Utility function to format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Calculate mortgage monthly payment
export const calculateMortgagePayment = (principal, annualRate, years) => {
  const monthlyRate = annualRate / 12 / 100;
  const numberOfPayments = years * 12;
  
  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }
  
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
         (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
};

// Main calculation function
export const calculateComparison = (formData) => {
  // Extract and convert values
  const prezzoAcquisto = formData.prezzoAcquisto;
  const speseRistrutturazione = formData.speseRistrutturazione;
  const imu = formData.imu;
  const manutenzione = formData.manutenzione / 100;
  const assicurazione = formData.assicurazione;
  const orizzonteTempo = formData.orizzonteTempo;
  const valorizzazione = formData.valorizzazione / 100;
  const liquidita = formData.liquidita;
  
  const anticipo = formData.anticipo / 100;
  const tassoInteresse = formData.tassoInteresse / 100;
  const durataMutuo = formData.durataMutuo;
  const speseNotarili = formData.speseNotarili;
  
  const canoneAffitto = formData.canoneAffitto;
  const aumentoCanone = formData.aumentoCanone / 100;
  const cauzione = formData.cauzione;
  const speseCondominiali = formData.speseCondominiali;
  const costiTrasloco = formData.costiTrasloco;
  const frequenzaTrasloco = formData.frequenzaTrasloco;
  
  const tassazione = formData.tassazione / 100;
  const rischioMercato = formData.rischioMercato;
  const includiInvestimenti = formData.includiInvestimenti;
  const tassoSconto = includiInvestimenti ? formData.tassoSconto / 100 : 0;

  // Calculate mortgage details
  const importoMutuo = prezzoAcquisto * (1 - anticipo);
  const importoAnticipo = prezzoAcquisto * anticipo;
  const rataMensile = calculateMortgagePayment(importoMutuo, tassoInteresse * 100, durataMutuo);
  
  let costiMutuoTotali = 0;
  let costiAffittoTotali = 0;
  
  // Initial mortgage costs
  costiMutuoTotali += importoAnticipo + speseNotarili + speseRistrutturazione;
  
  // Annual mortgage costs
  let valoreImmobile = prezzoAcquisto;
  
  for (let anno = 1; anno <= orizzonteTempo; anno++) {
    let costiAnno = (rataMensile * 12) + imu + (valoreImmobile * manutenzione) + assicurazione;
    
    // Apply discount rate if considering investments
    if (includiInvestimenti) {
      costiMutuoTotali += costiAnno / Math.pow(1 + tassoSconto, anno);
    } else {
      costiMutuoTotali += costiAnno;
    }
    valoreImmobile *= (1 + valorizzazione);
  }
  
  // Property final value calculation
  const costiVendita = valoreImmobile * liquidita * 0.05;
  const plusvalenza = Math.max(0, valoreImmobile - prezzoAcquisto - costiVendita);
  const tassePlusvalenza = plusvalenza * tassazione;
  const valoreNettoVendita = valoreImmobile - costiVendita - tassePlusvalenza;
  
  // Calculate property benefit
  let beneficioPatrimoniale = 0;
  if (includiInvestimenti) {
    const valoreAttualePatrimonio = valoreNettoVendita / Math.pow(1 + tassoSconto, orizzonteTempo);
    beneficioPatrimoniale = valoreAttualePatrimonio - (prezzoAcquisto * Math.pow(1 + tassoSconto, orizzonteTempo));
    costiMutuoTotali -= Math.max(0, beneficioPatrimoniale);
  } else {
    beneficioPatrimoniale = (valoreNettoVendita - prezzoAcquisto) * 0.7;
    costiMutuoTotali -= Math.max(0, beneficioPatrimoniale);
  }
  
  // Calculate rent costs
  costiAffittoTotali += canoneAffitto * cauzione;
  
  let canoneCorrente = canoneAffitto;
  
  for (let anno = 1; anno <= orizzonteTempo; anno++) {
    let costiAnno = (canoneCorrente * 12) + (speseCondominiali * 12);
    
    // Add moving costs
    if (anno % frequenzaTrasloco === 0) {
      costiAnno += costiTrasloco;
    }
    
    if (includiInvestimenti) {
      costiAffittoTotali += costiAnno / Math.pow(1 + tassoSconto, anno);
    } else {
      costiAffittoTotali += costiAnno;
    }
    canoneCorrente *= (1 + aumentoCanone);
  }
  
  // Add opportunity cost if considering investments
  if (includiInvestimenti) {
    const rendimentoAlternativo = importoAnticipo * Math.pow(1 + tassoSconto, orizzonteTempo);
    const costoOpportunita = rendimentoAlternativo - importoAnticipo;
    costiAffittoTotali += costoOpportunita;
  }
  
  // Apply market risk
  costiMutuoTotali *= (1 + rischioMercato);
  
  // Calculate difference and percentage
  const differenza = costiMutuoTotali - costiAffittoTotali;
  const percentualeDiff = Math.abs(differenza / Math.min(costiMutuoTotali, costiAffittoTotali) * 100);
  
  // Calculate yield
  const yieldAffitto = (canoneAffitto * 12 / prezzoAcquisto) * 100;
  
  // Generate insights
  const insights = generateInsights(formData, differenza);
  
  // Generate sensitivity analysis
  const sensitivityAnalysis = generateSensitivityAnalysis(formData, rataMensile);
  
  // Generate charts data
  const chartData = generateChartData(formData, rataMensile);
  
  return {
    costiMutuo: Math.abs(costiMutuoTotali),
    costiAffitto: Math.abs(costiAffittoTotali),
    differenza,
    percentualeDiff,
    isAcquistoConveniente: differenza < 0,
    importoAnticipo,
    rataMensile,
    valoreNettoVendita,
    yieldAffitto,
    insights,
    sensitivityAnalysis,
    chartData,
    formData: {
      ...formData,
      rataMensile,
      importoAnticipo,
      valoreNettoVendita
    }
  };
};

// Generate personalized insights
const generateInsights = (dati, differenza) => {
  const suggerimenti = [];
  const isAcquistoConveniente = differenza < 0;
  const risparmio = Math.abs(differenza);
  
  // Main insight
  if (risparmio > 10000) {
    const azione = isAcquistoConveniente ? 'risparmiare' : 'spendere';
    const valoreFormattato = formatCurrency(risparmio);
    suggerimenti.push({
      icona: "💰",
      testo: `Potresti ${azione} ${valoreFormattato} nei prossimi ${dati.orizzonteTempo} anni`
    });
  }
  
  // Time horizon insights
  if (dati.orizzonteTempo < 7) {
    suggerimenti.push({
      icona: "⏰",
      testo: "Con un orizzonte così breve, considera i costi di transazione. L'affitto offre più flessibilità."
    });
  } else if (dati.orizzonteTempo > 15) {
    suggerimenti.push({
      icona: "🏠",
      testo: "Su lungo termine, la proprietà immobiliare tende a essere più vantaggiosa per l'accumulo patrimoniale."
    });
  }
  
  // Interest rate insights
  const tassoAttuale = dati.tassoInteresse / 100;
  if (tassoAttuale > 4.5) {
    suggerimenti.push({
      icona: "📈",
      testo: "I tassi attuali sono alti. Considera di aspettare un eventuale calzo o negoziare condizioni migliori."
    });
  }
  
  // Yield insights
  const yieldAffitto = (dati.canoneAffitto * 12 / dati.prezzoAcquisto) * 100;
  if (yieldAffitto < 3) {
    suggerimenti.push({
      icona: "⚡",
      testo: `Lo yield affitto è solo ${yieldAffitto.toFixed(1)}%. Questo immobile potrebbe essere sopravvalutato per l'investimento.`
    });
  } else if (yieldAffitto > 6) {
    suggerimenti.push({
      icona: "🎯",
      testo: `Yield affitto eccellente (${yieldAffitto.toFixed(1)}%)! L'acquisto sembra un buon affare.`
    });
  }
  
  // Future prediction
  const valoreTraDieci = dati.prezzoAcquisto * Math.pow(1 + dati.valorizzazione / 100, 10);
  if (isAcquistoConveniente) {
    suggerimenti.push({
      icona: "🔮",
      testo: `Tra 10 anni il tuo patrimonio immobiliare potrebbe valere circa ${formatCurrency(valoreTraDieci)}`
    });
  }
  
  return suggerimenti;
};

// Generate sensitivity analysis
const generateSensitivityAnalysis = (dati, rataMensile) => {
  const analisi = [];
  
  // Interest rate sensitivity
  const tassoAttuale = dati.tassoInteresse / 100;
  const nuovoTasso = tassoAttuale + 0.015;
  const importoMutuo = dati.prezzoAcquisto * 0.8;
  const nuovaRata = calculateMortgagePayment(importoMutuo, nuovoTasso * 100, 25);
  const aumentoRata = (nuovaRata - rataMensile) * 12 * dati.orizzonteTempo;
  
  analisi.push({
    scenario: `Se i tassi aumentano al ${(nuovoTasso * 100).toFixed(1)}%`,
    impatto: `Costi aggiuntivi: ${formatCurrency(aumentoRata)}`,
    colore: "#e74c3c"
  });
  
  // Property appreciation sensitivity
  if (dati.valorizzazione < 1) {
    const perdita = dati.prezzoAcquisto * (dati.valorizzazione / 100) * dati.orizzonteTempo;
    analisi.push({
      scenario: "Se l'immobile non si valorizza (0%)",
      impatto: `Perdi ${formatCurrency(Math.abs(perdita))} di guadagni potenziali`,
      colore: "#e74c3c"
    });
  } else {
    const valorizzazioneDoppia = dati.prezzoAcquisto * Math.pow(1 + (dati.valorizzazione / 100) * 2, dati.orizzonteTempo);
    const valorizzazioneNormale = dati.prezzoAcquisto * Math.pow(1 + dati.valorizzazione / 100, dati.orizzonteTempo);
    const guadagnoExtra = valorizzazioneDoppia - valorizzazioneNormale;
    analisi.push({
      scenario: `Se la valorizzazione raddoppia (${(dati.valorizzazione * 2).toFixed(1)}%)`,
      impatto: `Guadagni extra: ${formatCurrency(guadagnoExtra)}`,
      colore: "#27ae60"
    });
  }
  
  // Rent cost sensitivity
  const affittoPiu20 = dati.canoneAffitto * 1.2;
  const costoExtraAffitto = (affittoPiu20 - dati.canoneAffitto) * 12 * dati.orizzonteTempo;
  analisi.push({
    scenario: `Se l'affitto costa +20% (${formatCurrency(affittoPiu20)}/mese)`,
    impatto: `Costi extra: ${formatCurrency(costoExtraAffitto)}`,
    colore: "#f39c12"
  });
  
  return analisi;
};

// Generate chart data
const generateChartData = (dati, rataMensile) => {
  const anni = [];
  const costiAcquistoAnnuali = [];
  const costiAffittoAnnuali = [];
  const valoreImmobileAnnuale = [];
  const patrimonioNettoAnnuale = [];
  
  let costoAcquistoCumulativo = (dati.prezzoAcquisto * dati.anticipo / 100) + dati.speseNotarili + dati.speseRistrutturazione;
  let costoAffittoCumulativo = dati.canoneAffitto * 3;
  let valoreImmobile = dati.prezzoAcquisto;
  let canoneCorrente = dati.canoneAffitto;
  
  for (let anno = 0; anno <= dati.orizzonteTempo; anno++) {
    anni.push(anno);
    
    if (anno === 0) {
      costiAcquistoAnnuali.push(costoAcquistoCumulativo);
      costiAffittoAnnuali.push(costoAffittoCumulativo);
      valoreImmobileAnnuale.push(valoreImmobile);
      patrimonioNettoAnnuale.push(valoreImmobile - costoAcquistoCumulativo);
    } else {
      const costiAnnoAcquisto = (rataMensile * 12) + dati.imu + (valoreImmobile * dati.manutenzione / 100) + dati.assicurazione;
      costoAcquistoCumulativo += costiAnnoAcquisto;
      
      const costiAnnoAffitto = (canoneCorrente * 12) + (dati.speseCondominiali * 12);
      costoAffittoCumulativo += costiAnnoAffitto;
      
      valoreImmobile *= (1 + dati.valorizzazione / 100);
      canoneCorrente *= (1 + dati.aumentoCanone / 100);
      
      costiAcquistoAnnuali.push(costoAcquistoCumulativo);
      costiAffittoAnnuali.push(costoAffittoCumulativo);
      valoreImmobileAnnuale.push(valoreImmobile);
      patrimonioNettoAnnuale.push(valoreImmobile - costoAcquistoCumulativo);
    }
  }
  
  return {
    anni,
    costiAcquistoAnnuali,
    costiAffittoAnnuali,
    valoreImmobileAnnuale,
    patrimonioNettoAnnuale
  };
}; 