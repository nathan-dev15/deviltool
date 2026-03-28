import type { ToolFaq, ToolInternalLink, ToolSeoConfig } from "./toolSeo";
import type { SupportedLocale } from "@/src/i18n/locales";

export type ToolSeoPage = {
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  howToSteps: string[];
  features: string[];
  benefits: string[];
  faqs: ToolFaq[];
  internalLinks: ToolInternalLink[];
  cta: { headline: string; copy: string; buttonText: string; buttonHref: string };
  urlSlug: string;
  imageAltText: string;
  mainKeyword: string;
  secondaryKeywords: string[];
  toolName: string;
};

function clamp(input: string, max: number) {
  if (input.length <= max) return input;
  return input.slice(0, max - 3).trimEnd() + "...";
}

function defaultTitle(toolName: string, mainKeyword: string) {
  // Keep it short and keyword-forward.
  const base = `${toolName} - ${mainKeyword}`;
  return clamp(base, 60);
}

function defaultMeta(mainKeyword: string, toolName: string) {
  const base = `${toolName}: ${mainKeyword}. Fast, secure, and free in your browser.`;
  return clamp(base, 160);
}

function defaultIntro(toolName: string, mainKeyword: string, secondaryKeywords: string[]) {
  const s1 = secondaryKeywords[0] ? ` It also helps with ${secondaryKeywords[0]}.` : "";
  const s2 = secondaryKeywords[1] ? ` You can use it for ${secondaryKeywords[1]}.` : "";
  return (
    `${toolName} helps you ${mainKeyword} with a clean, fast workflow.` +
    ` Paste or upload your data, get instant results, and copy or download the output.` +
    ` The tool is designed for everyday developer work: quick checks, safe transformations, and readable output.` +
    s1 +
    s2 +
    ` If you need ${mainKeyword} on mobile or desktop, this page is built to be simple and reliable.`
  );
}

function defaultHowTo(toolName: string) {
  return [
    `Open the ${toolName} page.`,
    "Add your input (paste, type, or upload if supported).",
    "Run the tool action (format, convert, generate, or decode).",
    "Copy the result or download it for your project.",
  ];
}

function defaultFeatures(toolName: string, mainKeyword: string) {
  return [
    `Built for ${mainKeyword}`,
    "Fast results with a clean interface",
    "Copy and download options",
    "Works on desktop and mobile",
    "Privacy-friendly by design",
    `Helpful defaults tailored to ${toolName}`,
  ];
}

function defaultBenefits(mainKeyword: string) {
  return [
    `Save time: ${mainKeyword} in seconds.`,
    "Reduce mistakes with clear outputs and simple steps.",
    "Improve productivity with copy/download-ready results.",
    "Work confidently with a privacy-friendly, browser-based workflow.",
  ];
}

function defaultFaqs(toolName: string, mainKeyword: string): ToolFaq[] {
  return [
    {
      question: `How do I ${mainKeyword}?`,
      answer:
        `Open the ${toolName} page, add your input, run the tool, and copy or download the result.`,
    },
    {
      question: `Is this ${toolName} free to use?`,
      answer: "Yes. You can use the tool for free without creating an account.",
    },
    {
      question: `Does ${toolName} work on mobile?`,
      answer: "Yes. The page is responsive and works on modern mobile browsers.",
    },
    {
      question: `Is my data uploaded to a server?`,
      answer:
        "Most tools are designed to run in your browser. If a tool needs a network request, the UI should make it clear.",
    },
    {
      question: `What should I do if the output looks wrong?`,
      answer:
        "Double-check the input format and try smaller samples. If the issue persists, refresh the page and try again.",
    },
  ];
}

function defaultLinks(urlSlug: string): ToolInternalLink[] {
  // Safe defaults; tool pages can override with stronger, relevant links.
  const ideas: ToolInternalLink[] = [
    { label: "JSON Formatter", href: "/json-formatter", note: "Beautify and validate JSON." },
    { label: "JSON Validator", href: "/json-validator", note: "Check JSON syntax quickly." },
    { label: "Password Generator", href: "/password-generator", note: "Create strong passwords." },
    { label: "Word Counter", href: "/word-counter", note: "Count words and characters." },
  ];
  return ideas.filter((l) => l.href !== urlSlug).slice(0, 4);
}

function defaultCta(toolName: string, urlSlug: string, mainKeyword: string) {
  return {
    headline: `Try ${toolName} now`,
    copy: `Use ${toolName} to ${mainKeyword} with a simple, fast workflow.`,
    buttonText: `Open ${toolName}`,
    buttonHref: urlSlug,
  };
}

function normLocale(locale?: SupportedLocale): SupportedLocale {
  if (!locale) return "en";
  return locale === "en-US" ? "en" : locale;
}

function localizedMeta(locale: SupportedLocale, mainKeyword: string, toolName: string) {
  const loc = normLocale(locale);
  switch (loc) {
    case "hi": return clamp(`${toolName}: ${mainKeyword}. तेज, सुरक्षित और मुफ्त (ब्राउज़र में).`, 160);
    case "id": return clamp(`${toolName}: ${mainKeyword}. Cepat, aman, dan gratis di browser.`, 160);
    case "pt-BR": return clamp(`${toolName}: ${mainKeyword}. Rapido, seguro e gratis no navegador.`, 160);
    case "ja": return clamp(`${toolName}: ${mainKeyword}。高速・安全・無料（ブラウザ内）。`, 160);
    case "de": return clamp(`${toolName}: ${mainKeyword}. Schnell, sicher und kostenlos im Browser.`, 160);
    case "ru": return clamp(`${toolName}: ${mainKeyword}. Быстро, безопасно и бесплатно в браузере.`, 160);
    case "ta": return clamp(`${toolName}: ${mainKeyword}. வேகம், பாதுகாப்பு, இலவசம் (உலாவியில்).`, 160);
    default: return defaultMeta(mainKeyword, toolName);
  }
}

function localizedIntro(locale: SupportedLocale, toolName: string, mainKeyword: string, secondaryKeywords: string[]) {
  const loc = normLocale(locale);
  const s1 = secondaryKeywords[0];
  const s2 = secondaryKeywords[1];
  switch (loc) {
    case "hi":
      return (
        `${toolName} आपको ${mainKeyword} करने में साफ और तेज वर्कफ़्लो के साथ मदद करता है।` +
        ` अपना डेटा पेस्ट/अपलोड करें, तुरंत परिणाम पाएं, और आउटपुट कॉपी या डाउनलोड करें।` +
        ` यह टूल रोज़मर्रा के काम के लिए बनाया गया है: जल्दी जांच, सुरक्षित ट्रांसफॉर्मेशन, और पढ़ने योग्य आउटपुट।` +
        (s1 ? ` यह ${s1} में भी मदद करता है।` : "") +
        (s2 ? ` आप इसे ${s2} के लिए भी इस्तेमाल कर सकते हैं।` : "") +
        ` अगर आपको मोबाइल या डेस्कटॉप पर ${mainKeyword} चाहिए, तो यह पेज सरल और भरोसेमंद है।`
      );
    case "id":
      return (
        `${toolName} membantu Anda ${mainKeyword} dengan alur kerja yang rapi dan cepat.` +
        ` Tempel atau unggah data, dapatkan hasil instan, lalu salin atau unduh output.` +
        ` Dirancang untuk kerja harian: cek cepat, transformasi aman, dan output yang mudah dibaca.` +
        (s1 ? ` Juga membantu untuk ${s1}.` : "") +
        (s2 ? ` Bisa dipakai untuk ${s2}.` : "") +
        ` Jika Anda butuh ${mainKeyword} di mobile atau desktop, halaman ini dibuat sederhana dan andal.`
      );
    case "pt-BR":
      return (
        `${toolName} ajuda voce a ${mainKeyword} com um fluxo limpo e rapido.` +
        ` Cole ou envie seus dados, obtenha resultados imediatos e copie ou baixe o output.` +
        ` Feito para o trabalho do dia a dia: checagens rapidas, transformacoes seguras e saida legivel.` +
        (s1 ? ` Tambem ajuda com ${s1}.` : "") +
        (s2 ? ` Voce pode usar para ${s2}.` : "") +
        ` Se voce precisa ${mainKeyword} no celular ou no desktop, esta pagina foi feita para ser simples e confiavel.`
      );
    case "ja":
      return (
        `${toolName}は、${mainKeyword}をシンプルで高速な手順で行うためのツールです。` +
        ` データを貼り付け/アップロードして、すぐに結果を取得し、コピーやダウンロードできます。` +
        ` 日常の作業向けに設計: すばやい確認、安全な変換、読みやすい出力。` +
        (s1 ? ` ${s1}にも役立ちます。` : "") +
        (s2 ? ` ${s2}にも使えます。` : "") +
        ` モバイルやPCで${mainKeyword}が必要なら、このページはシンプルで信頼性重視です。`
      );
    case "de":
      return (
        `${toolName} hilft dir, ${mainKeyword} mit einem sauberen, schnellen Workflow zu erledigen.` +
        ` Daten einfugen/hochladen, sofort Ergebnisse bekommen und Ausgabe kopieren oder herunterladen.` +
        ` Fur den Alltag gebaut: schnelle Checks, sichere Transformationen und lesbare Outputs.` +
        (s1 ? ` Hilft auch bei ${s1}.` : "") +
        (s2 ? ` Nutzbar fur ${s2}.` : "") +
        ` Wenn du ${mainKeyword} am Handy oder Desktop brauchst, ist diese Seite einfach und zuverlassig.`
      );
    case "ru":
      return (
        `${toolName} помогает выполнить ${mainKeyword} с чистым и быстрым рабочим процессом.` +
        ` Вставьте или загрузите данные, получите результат мгновенно и скопируйте или скачайте.` +
        ` Для повседневной работы: быстрые проверки, безопасные преобразования и читаемый вывод.` +
        (s1 ? ` Также помогает с: ${s1}.` : "") +
        (s2 ? ` Можно использовать для: ${s2}.` : "") +
        ` Если вам нужно ${mainKeyword} на телефоне или ПК, эта страница простая и надежная.`
      );
    case "ta":
      return (
        `${toolName} மூலம் ${mainKeyword} செய்வது சுத்தமான, வேகமான முறையில் முடியும்.` +
        ` தரவை ஒட்டி அல்லது (தேவைப்பட்டால்) அப்லோடு செய்து, உடனடி முடிவை பெற்று, காப்பி அல்லது டவுன்லோடு செய்யலாம்.` +
        ` தினசரி வேலைக்காக வடிவமைக்கப்பட்டது: விரைவு சரிபார்ப்பு, பாதுகாப்பான மாற்றம், படிக்க எளிய வெளியீடு.` +
        (s1 ? ` இது ${s1}க்கும் உதவும்.` : "") +
        (s2 ? ` ${s2}க்காகவும் பயன்படுத்தலாம்.` : "") +
        ` மொபைல் அல்லது டெஸ்க்டாப்பில் ${mainKeyword} வேண்டுமெனில், இந்த பக்கம் எளிமையும் நம்பகத்தன்மையும் கொண்டது.`
      );
    default:
      return defaultIntro(toolName, mainKeyword, secondaryKeywords);
  }
}

function localizedHowTo(locale: SupportedLocale, toolName: string) {
  const loc = normLocale(locale);
  switch (loc) {
    case "hi": return [`${toolName} पेज खोलें।`, "अपना इनपुट जोड़ें (पेस्ट/टाइप/अपलोड)।", "टूल ऐक्शन चलाएं (format/convert/generate/decode)।", "रिज़ल्ट कॉपी करें या डाउनलोड करें।"];
    case "id": return [`Buka halaman ${toolName}.`, "Tambahkan input (tempel, ketik, atau unggah jika didukung).", "Jalankan aksi tool (format, convert, generate, atau decode).", "Salin hasil atau unduh untuk proyek Anda."];
    case "pt-BR": return [`Abra a pagina do ${toolName}.`, "Adicione sua entrada (colar, digitar ou enviar, se suportado).", "Execute a acao (formatar, converter, gerar ou decodificar).", "Copie o resultado ou baixe para seu projeto."];
    case "ja": return [`${toolName}ページを開きます。`, "入力を追加します（貼り付け、入力、対応していればアップロード）。", "ツールを実行します（format/convert/generate/decode）。", "結果をコピーするかダウンロードします。"];
    case "de": return [`Die ${toolName}-Seite offnen.`, "Input hinzufugen (einfügen, tippen oder hochladen).", "Tool ausfuhren (formatieren, konvertieren, generieren oder dekodieren).", "Ergebnis kopieren oder herunterladen."];
    case "ru": return [`Откройте страницу ${toolName}.`, "Добавьте входные данные (вставьте, введите или загрузите).", "Запустите действие (format/convert/generate/decode).", "Скопируйте результат или скачайте."];
    case "ta": return [`${toolName} பக்கத்தை திறக்கவும்.`, "உங்கள் உள்ளீட்டை சேர்க்கவும் (ஒட்டு/உள்ளிடு/அப்லோடு).", "கருவி செயலை இயக்கவும் (format/convert/generate/decode).", "முடிவை காப்பி அல்லது டவுன்லோடு செய்யவும்."];
    default: return defaultHowTo(toolName);
  }
}

function localizedFeatures(locale: SupportedLocale, toolName: string, mainKeyword: string) {
  const loc = normLocale(locale);
  switch (loc) {
    case "hi": return [`${mainKeyword} के लिए बनाया गया`, "क्लीन UI के साथ तेज परिणाम", "कॉपी और डाउनलोड विकल्प", "मोबाइल और डेस्कटॉप पर काम करता है", "प्राइवेसी-फ्रेंडली डिजाइन", `${toolName} के लिए उपयोगी डिफ़ॉल्ट्स`];
    case "id": return [`Dibuat untuk ${mainKeyword}`, "Hasil cepat dengan antarmuka bersih", "Opsi salin dan unduh", "Berfungsi di desktop dan mobile", "Ramah privasi", `Default yang membantu untuk ${toolName}`];
    case "pt-BR": return [`Feito para ${mainKeyword}`, "Resultados rapidos com interface limpa", "Opcoes de copiar e baixar", "Funciona no desktop e no celular", "Privacidade por design", `Padroes uteis para ${toolName}`];
    case "ja": return [`${mainKeyword}向けに最適化`, "クリーンなUIで高速", "コピー/ダウンロード対応", "PC/スマホ対応", "プライバシー重視", `${toolName}向けの便利なデフォルト`];
    case "de": return [`Optimiert fur ${mainKeyword}`, "Schnelle Ergebnisse mit sauberer UI", "Kopieren- und Download-Optionen", "Funktioniert auf Desktop und Mobile", "Datenschutzfreundlich", `Sinnvolle Defaults fur ${toolName}`];
    case "ru": return [`Сделано для ${mainKeyword}`, "Быстрые результаты и понятный интерфейс", "Копирование и скачивание", "Работает на ПК и телефоне", "Дружелюбно к приватности", `Удобные настройки по умолчанию для ${toolName}`];
    case "ta": return [`${mainKeyword}க்கு உருவாக்கப்பட்டது`, "சுத்தமான UI உடன் வேகமான முடிவுகள்", "காப்பி மற்றும் டவுன்லோடு விருப்பங்கள்", "மொபைல் மற்றும் டெஸ்க்டாப்பில் வேலை செய்கிறது", "தனியுரிமை நட்பு வடிவமைப்பு", `${toolName}க்கான உதவிகரமான இயல்புநிலைகள்`];
    default: return defaultFeatures(toolName, mainKeyword);
  }
}

function localizedBenefits(locale: SupportedLocale, mainKeyword: string) {
  const loc = normLocale(locale);
  switch (loc) {
    case "hi": return [`समय बचाएं: ${mainKeyword} सेकंड में।`, "साफ आउटपुट और आसान स्टेप्स से गलतियां कम करें।", "कॉपी/डाउनलोड-ready परिणामों से प्रोडक्टिविटी बढ़ाएं।", "ब्राउज़र-बेस्ड, प्राइवेसी-फ्रेंडली वर्कफ़्लो के साथ भरोसे से काम करें।"];
    case "id": return [`Hemat waktu: ${mainKeyword} dalam hitungan detik.`, "Kurangi kesalahan dengan output yang jelas dan langkah sederhana.", "Lebih produktif dengan hasil siap salin/unduh.", "Kerja lebih percaya diri dengan workflow berbasis browser yang ramah privasi."];
    case "pt-BR": return [`Economize tempo: ${mainKeyword} em segundos.`, "Reduza erros com saidas claras e passos simples.", "Aumente a produtividade com resultados prontos para copiar/baixar.", "Trabalhe com confianca em um fluxo no navegador e amigavel a privacidade."];
    case "ja": return [`時短: ${mainKeyword}を数秒で。`, "わかりやすい出力と簡単手順でミスを減らす。", "コピー/ダウンロードですぐ使える。", "ブラウザ内で完結するプライバシー重視のワークフロー。"];
    case "de": return [`Zeit sparen: ${mainKeyword} in Sekunden.`, "Weniger Fehler durch klare Ausgaben und einfache Schritte.", "Mehr Produktivitat mit copy/download-ready Ergebnissen.", "Sicher arbeiten mit browser-basiertem, datenschutzfreundlichem Workflow."];
    case "ru": return [`Экономия времени: ${mainKeyword} за секунды.`, "Меньше ошибок благодаря ясному выводу и простым шагам.", "Готовые результаты для копирования/скачивания повышают продуктивность.", "Уверенная работа с браузерным и приватным workflow."];
    case "ta": return [`நேரம் சேமிக்க: ${mainKeyword} சில வினாடிகளில்.`, "தெளிவான வெளியீடு மற்றும் எளிய படிகளால் பிழைகள் குறையும்.", "காப்பி/டவுன்லோடு-ready முடிவுகள் உற்பத்தித்திறனை உயர்த்தும்.", "உலாவி-அடிப்படையிலான தனியுரிமை நட்பு வேலைமுறையில் நம்பிக்கையுடன் வேலை செய்யலாம்."];
    default: return defaultBenefits(mainKeyword);
  }
}

function localizedFaqs(locale: SupportedLocale, toolName: string, mainKeyword: string): ToolFaq[] {
  const loc = normLocale(locale);
  switch (loc) {
    case "hi":
      return [
        { question: `मैं ${mainKeyword} कैसे करूं?`, answer: `${toolName} पेज खोलें, इनपुट जोड़ें, टूल चलाएं, और आउटपुट कॉपी/डाउनलोड करें।` },
        { question: `क्या ${toolName} मुफ्त है?`, answer: "हाँ। बिना अकाउंट के भी आप इस टूल का उपयोग कर सकते हैं।" },
        { question: `क्या ${toolName} मोबाइल पर चलता है?`, answer: "हाँ। यह पेज मोबाइल ब्राउज़र्स पर भी काम करता है।" },
        { question: "क्या मेरा डेटा सर्वर पर अपलोड होता है?", answer: "अधिकांश टूल्स ब्राउज़र में ही चलते हैं। अगर किसी टूल को नेटवर्क चाहिए, UI में बताया जाएगा।" },
        { question: "अगर आउटपुट गलत लगे तो क्या करें?", answer: "इनपुट फॉर्मेट जांचें और छोटे सैंपल से ट्राई करें। समस्या रहे तो पेज रिफ्रेश करके दोबारा करें।" },
      ];
    case "id":
      return [
        { question: `Bagaimana cara ${mainKeyword}?`, answer: `Buka halaman ${toolName}, tambahkan input, jalankan tool, lalu salin atau unduh hasilnya.` },
        { question: `Apakah ${toolName} gratis?`, answer: "Ya. Anda dapat menggunakannya tanpa membuat akun." },
        { question: `Apakah ${toolName} bisa di mobile?`, answer: "Ya. Halaman ini responsif dan bekerja di browser modern." },
        { question: "Apakah data saya diunggah ke server?", answer: "Sebagian besar tool berjalan di browser. Jika ada tool yang butuh jaringan, UI akan menjelaskannya." },
        { question: "Apa yang harus saya lakukan jika hasilnya salah?", answer: "Periksa format input dan coba sampel kecil. Jika masih bermasalah, refresh halaman dan coba lagi." },
      ];
    case "pt-BR":
      return [
        { question: `Como ${mainKeyword}?`, answer: `Abra a pagina do ${toolName}, adicione a entrada, execute o tool e copie ou baixe o resultado.` },
        { question: `O ${toolName} e gratis?`, answer: "Sim. Voce pode usar sem criar uma conta." },
        { question: `O ${toolName} funciona no celular?`, answer: "Sim. A pagina e responsiva e funciona em navegadores modernos." },
        { question: "Meus dados sao enviados para um servidor?", answer: "A maioria dos tools roda no navegador. Se algum tool precisar de rede, a interface vai deixar claro." },
        { question: "O que fazer se o resultado estiver errado?", answer: "Verifique o formato da entrada e tente exemplos menores. Se persistir, atualize a pagina e tente novamente." },
      ];
    case "ja":
      return [
        { question: `${mainKeyword}はどうやって行いますか？`, answer: `${toolName}ページを開き、入力を追加して実行し、結果をコピー/ダウンロードします。` },
        { question: `${toolName}は無料ですか？`, answer: "はい。アカウントなしで無料で使えます。" },
        { question: `${toolName}はスマホで使えますか？`, answer: "はい。レスポンシブで、最新ブラウザで動作します。" },
        { question: "データはサーバーに送信されますか？", answer: "多くのツールはブラウザで動作します。ネットワークが必要な場合はUIで明示します。" },
        { question: "結果がおかしい場合は？", answer: "入力形式を確認し、小さなサンプルで試してください。解決しない場合は更新して再試行します。" },
      ];
    case "de":
      return [
        { question: `Wie kann ich ${mainKeyword}?`, answer: `${toolName} offnen, Input hinzufugen, Tool ausfuhren und Ergebnis kopieren oder herunterladen.` },
        { question: `Ist ${toolName} kostenlos?`, answer: "Ja. Kostenlos nutzbar ohne Konto." },
        { question: `Funktioniert ${toolName} auf dem Handy?`, answer: "Ja. Responsiv und kompatibel mit modernen Browsern." },
        { question: "Werden meine Daten auf einen Server hochgeladen?", answer: "Die meisten Tools laufen im Browser. Falls ein Tool Netzwerk braucht, wird das in der UI klar angezeigt." },
        { question: "Was tun, wenn das Ergebnis falsch aussieht?", answer: "Input-Format prufen und kleinere Beispiele testen. Wenn es bleibt, Seite neu laden und erneut versuchen." },
      ];
    case "ru":
      return [
        { question: `Как сделать ${mainKeyword}?`, answer: `Откройте ${toolName}, добавьте данные, запустите инструмент и скопируйте или скачайте результат.` },
        { question: `${toolName} бесплатный?`, answer: "Да. Можно пользоваться бесплатно без аккаунта." },
        { question: `${toolName} работает на телефоне?`, answer: "Да. Страница адаптивная и работает в современных браузерах." },
        { question: "Мои данные загружаются на сервер?", answer: "Большинство инструментов работают в браузере. Если нужен запрос к сети, интерфейс это покажет." },
        { question: "Что делать, если результат выглядит неправильно?", answer: "Проверьте формат входных данных и попробуйте меньший пример. Если проблема остается, обновите страницу и повторите." },
      ];
    case "ta":
      return [
        { question: `${mainKeyword} எப்படி செய்வது?`, answer: `${toolName} பக்கத்தை திறந்து, உள்ளீட்டை சேர்த்து, கருவியை இயக்கி, முடிவை காப்பி/டவுன்லோடு செய்யவும்.` },
        { question: `${toolName} இலவசமா?`, answer: "ஆம். கணக்கு இல்லாமலும் பயன்படுத்தலாம்." },
        { question: `${toolName} மொபைலில் வேலை செய்யுமா?`, answer: "ஆம். இந்த பக்கம் மொபைல் உலாவிகளில் சரியாக வேலை செய்கிறது." },
        { question: "என் தரவு சர்வருக்கு அப்லோடு ஆகுமா?", answer: "பல கருவிகள் உலாவியில் தான் இயங்கும். நெட்வொர்க் தேவைப்பட்டால் UI தெரிவிக்கும்." },
        { question: "வெளியீடு தவறாக தெரிந்தால்?", answer: "உள்ளீட்டு வடிவத்தை சரிபார்க்கவும், சிறிய மாதிரியை முயற்சி செய்யவும். தொடர்ந்தால் பக்கத்தை ரிஃப்ரெஷ் செய்து மீண்டும் முயற்சி செய்யவும்." },
      ];
    default:
      return defaultFaqs(toolName, mainKeyword);
  }
}

function localizedLinks(locale: SupportedLocale, urlSlug: string) {
  const loc = normLocale(locale);
  switch (loc) {
    case "hi": return [
      { label: "JSON Formatter", href: "/json-formatter", note: "JSON को सुंदर और वैलिड करें।" },
      { label: "JSON Validator", href: "/json-validator", note: "JSON सिंटैक्स जल्दी जांचें।" },
      { label: "Password Generator", href: "/password-generator", note: "मजबूत पासवर्ड बनाएं।" },
      { label: "Word Counter", href: "/word-counter", note: "शब्द और अक्षर गिनें।" },
    ].filter((l) => l.href !== urlSlug).slice(0, 4);
    case "id": return [
      { label: "JSON Formatter", href: "/json-formatter", note: "Rapikan dan validasi JSON." },
      { label: "JSON Validator", href: "/json-validator", note: "Cek sintaks JSON dengan cepat." },
      { label: "Password Generator", href: "/password-generator", note: "Buat password kuat." },
      { label: "Word Counter", href: "/word-counter", note: "Hitung kata dan karakter." },
    ].filter((l) => l.href !== urlSlug).slice(0, 4);
    case "pt-BR": return [
      { label: "JSON Formatter", href: "/json-formatter", note: "Embeleze e valide JSON." },
      { label: "JSON Validator", href: "/json-validator", note: "Verifique sintaxe JSON rapidamente." },
      { label: "Password Generator", href: "/password-generator", note: "Gere senhas fortes." },
      { label: "Word Counter", href: "/word-counter", note: "Conte palavras e caracteres." },
    ].filter((l) => l.href !== urlSlug).slice(0, 4);
    case "ja": return [
      { label: "JSON Formatter", href: "/json-formatter", note: "JSONを整形・検証。" },
      { label: "JSON Validator", href: "/json-validator", note: "JSON構文をすばやく確認。" },
      { label: "Password Generator", href: "/password-generator", note: "強力なパスワードを生成。" },
      { label: "Word Counter", href: "/word-counter", note: "単語/文字数をカウント。" },
    ].filter((l) => l.href !== urlSlug).slice(0, 4);
    case "de": return [
      { label: "JSON Formatter", href: "/json-formatter", note: "JSON formatieren und validieren." },
      { label: "JSON Validator", href: "/json-validator", note: "JSON-Syntax schnell prufen." },
      { label: "Password Generator", href: "/password-generator", note: "Starke Passworter erzeugen." },
      { label: "Word Counter", href: "/word-counter", note: "Worter und Zeichen zahlen." },
    ].filter((l) => l.href !== urlSlug).slice(0, 4);
    case "ru": return [
      { label: "JSON Formatter", href: "/json-formatter", note: "Форматируйте и проверяйте JSON." },
      { label: "JSON Validator", href: "/json-validator", note: "Быстро проверяйте синтаксис JSON." },
      { label: "Password Generator", href: "/password-generator", note: "Генерируйте надежные пароли." },
      { label: "Word Counter", href: "/word-counter", note: "Считайте слова и символы." },
    ].filter((l) => l.href !== urlSlug).slice(0, 4);
    case "ta": return [
      { label: "JSON Formatter", href: "/json-formatter", note: "JSON ஐ வடிவமைத்து சரிபார்க்கவும்." },
      { label: "JSON Validator", href: "/json-validator", note: "JSON_Syntax ஐ விரைவாக சரிபார்க்கவும்." },
      { label: "Password Generator", href: "/password-generator", note: "வலுவான கடவுச்சொல் உருவாக்கவும்." },
      { label: "Word Counter", href: "/word-counter", note: "சொற்கள் மற்றும் எழுத்துகள் எண்ணவும்." },
    ].filter((l) => l.href !== urlSlug).slice(0, 4);
    default: return defaultLinks(urlSlug);
  }
}

function localizedCta(locale: SupportedLocale, toolName: string, urlSlug: string, mainKeyword: string) {
  const loc = normLocale(locale);
  switch (loc) {
    case "hi": return { headline: `${toolName} अभी आज़माएं`, copy: `सरल और तेज वर्कफ़्लो के साथ ${toolName} से ${mainKeyword} करें।`, buttonText: `${toolName} खोलें`, buttonHref: urlSlug };
    case "id": return { headline: `Coba ${toolName} sekarang`, copy: `Gunakan ${toolName} untuk ${mainKeyword} dengan alur kerja cepat dan sederhana.`, buttonText: `Buka ${toolName}`, buttonHref: urlSlug };
    case "pt-BR": return { headline: `Teste ${toolName} agora`, copy: `Use ${toolName} para ${mainKeyword} com um fluxo simples e rapido.`, buttonText: `Abrir ${toolName}`, buttonHref: urlSlug };
    case "ja": return { headline: `${toolName}を今すぐ試す`, copy: `${toolName}で${mainKeyword}を簡単・高速に。`, buttonText: `${toolName}を開く`, buttonHref: urlSlug };
    case "de": return { headline: `${toolName} jetzt testen`, copy: `${toolName} nutzen, um ${mainKeyword} schnell und einfach zu erledigen.`, buttonText: `${toolName} offnen`, buttonHref: urlSlug };
    case "ru": return { headline: `Попробуйте ${toolName} сейчас`, copy: `Используйте ${toolName}, чтобы выполнить ${mainKeyword} быстро и просто.`, buttonText: `Открыть ${toolName}`, buttonHref: urlSlug };
    case "ta": return { headline: `${toolName} இப்போது முயற்சி செய்யுங்கள்`, copy: `${toolName} மூலம் ${mainKeyword} எளிமையாகவும் வேகமாகவும் செய்யலாம்.`, buttonText: `${toolName} திற`, buttonHref: urlSlug };
    default: return defaultCta(toolName, urlSlug, mainKeyword);
  }
}

function translateToolName(locale: SupportedLocale, toolName: string) {
  const loc = normLocale(locale);
  const maps: Record<string, Record<string, string>> = {
    hi: {
      "Image Compressor": "इमेज कंप्रेसर",
      "JSON Formatter": "JSON फ़ॉर्मैटर",
      "JSON Validator": "JSON वैलिडेटर",
      "JSON Minifier": "JSON मिनिफ़ायर",
      "JSON Pretty Print": "JSON प्रिटी प्रिंट",
      "JSON to CSV": "JSON से CSV",
      "JSON to XML": "JSON से XML",
      "JSON to YAML": "JSON से YAML",
      "JSON to HTML Table": "JSON से HTML टेबल",
      "JSON Compare": "JSON तुलना",
      "JSON Sort Keys": "JSON की-सॉर्ट",
      "Base64 Encode": "Base64 एन्कोड",
      "Base64 Decode": "Base64 डीकोड",
      "URL Encode": "URL एन्कोड",
      "URL Decode": "URL डीकोड",
      "HTML Encode/Decode": "HTML एन्कोड/डीकोड",
      "JWT Decoder": "JWT डीकोडर",
      "Text to Base64": "टेक्स्ट से Base64",
      "Unicode Converter": "यूनिकोड कन्वर्टर",
      "String Comparison": "स्ट्रिंग तुलना",
      "Password Generator": "पासवर्ड जनरेटर",
      "Word Counter": "वर्ड काउंटर",
      "SQL Formatter": "SQL फ़ॉर्मैटर",
      "Age Calculator": "आयु कैलकुलेटर",
      "Time Between Dates": "तिथियों के बीच समय",
      "Image to Base64": "इमेज से Base64",
      "Base64 to Image": "Base64 से इमेज",
      "Session Vault": "सेशन वॉल्ट",
      "Pro Image Tool": "प्रो इमेज टूल",
      "Security Tools": "सुरक्षा टूल्स",
    },
    id: {
      "Image Compressor": "Kompresor Gambar",
      "JSON Formatter": "Formatter JSON",
      "JSON Validator": "Validator JSON",
      "JSON Minifier": "Minifier JSON",
      "JSON Pretty Print": "Pretty Print JSON",
      "JSON to CSV": "JSON ke CSV",
      "JSON to XML": "JSON ke XML",
      "JSON to YAML": "JSON ke YAML",
      "JSON to HTML Table": "JSON ke Tabel HTML",
      "JSON Compare": "Bandingkan JSON",
      "JSON Sort Keys": "Urutkan Key JSON",
      "Base64 Encode": "Encode Base64",
      "Base64 Decode": "Decode Base64",
      "URL Encode": "Encode URL",
      "URL Decode": "Decode URL",
      "HTML Encode/Decode": "Encode/Decode HTML",
      "JWT Decoder": "Decoder JWT",
      "Text to Base64": "Teks ke Base64",
      "Unicode Converter": "Konverter Unicode",
      "String Comparison": "Perbandingan String",
      "Password Generator": "Generator Kata Sandi",
      "Word Counter": "Penghitung Kata",
      "SQL Formatter": "Formatter SQL",
      "Age Calculator": "Kalkulator Usia",
      "Time Between Dates": "Selisih Tanggal",
      "Image to Base64": "Gambar ke Base64",
      "Base64 to Image": "Base64 ke Gambar",
      "Session Vault": "Vault Sesi",
      "Pro Image Tool": "Alat Gambar Pro",
      "Security Tools": "Alat Keamanan",
    },
    "pt-BR": {
      "Image Compressor": "Compressor de Imagens",
      "JSON Formatter": "Formatador JSON",
      "JSON Validator": "Validador JSON",
      "JSON Minifier": "Minificador JSON",
      "JSON Pretty Print": "Pretty Print JSON",
      "JSON to CSV": "JSON para CSV",
      "JSON to XML": "JSON para XML",
      "JSON to YAML": "JSON para YAML",
      "JSON to HTML Table": "JSON para Tabela HTML",
      "JSON Compare": "Comparar JSON",
      "JSON Sort Keys": "Ordenar Chaves JSON",
      "Base64 Encode": "Codificar Base64",
      "Base64 Decode": "Decodificar Base64",
      "URL Encode": "Codificar URL",
      "URL Decode": "Decodificar URL",
      "HTML Encode/Decode": "Codificar/Decodificar HTML",
      "JWT Decoder": "Decodificador JWT",
      "Text to Base64": "Texto para Base64",
      "Unicode Converter": "Conversor Unicode",
      "String Comparison": "Comparacao de Strings",
      "Password Generator": "Gerador de Senhas",
      "Word Counter": "Contador de Palavras",
      "SQL Formatter": "Formatador SQL",
      "Age Calculator": "Calculadora de Idade",
      "Time Between Dates": "Tempo Entre Datas",
      "Image to Base64": "Imagem para Base64",
      "Base64 to Image": "Base64 para Imagem",
      "Session Vault": "Cofre de Sessao",
      "Pro Image Tool": "Ferramenta de Imagem Pro",
      "Security Tools": "Ferramentas de Seguranca",
    },
    ja: {
      "Image Compressor": "画像圧縮",
      "JSON Formatter": "JSONフォーマッター",
      "JSON Validator": "JSONバリデーター",
      "JSON Minifier": "JSONミニファイ",
      "JSON Pretty Print": "JSON整形",
      "JSON to CSV": "JSON→CSV",
      "JSON to XML": "JSON→XML",
      "JSON to YAML": "JSON→YAML",
      "JSON to HTML Table": "JSON→HTML表",
      "JSON Compare": "JSON比較",
      "JSON Sort Keys": "JSONキー並べ替え",
      "Base64 Encode": "Base64エンコード",
      "Base64 Decode": "Base64デコード",
      "URL Encode": "URLエンコード",
      "URL Decode": "URLデコード",
      "HTML Encode/Decode": "HTMLエンコード/デコード",
      "JWT Decoder": "JWTデコーダー",
      "Text to Base64": "テキスト→Base64",
      "Unicode Converter": "Unicode変換",
      "String Comparison": "文字列比較",
      "Password Generator": "パスワード生成",
      "Word Counter": "文字数カウント",
      "SQL Formatter": "SQLフォーマッター",
      "Age Calculator": "年齢計算",
      "Time Between Dates": "日付差分",
      "Image to Base64": "画像→Base64",
      "Base64 to Image": "Base64→画像",
      "Session Vault": "セッション保管庫",
      "Pro Image Tool": "プロ画像ツール",
      "Security Tools": "セキュリティツール",
    },
    de: {
      "Image Compressor": "Bildkompressor",
      "JSON Formatter": "JSON-Formatter",
      "JSON Validator": "JSON-Validator",
      "JSON Minifier": "JSON-Minifier",
      "JSON Pretty Print": "JSON Pretty Print",
      "JSON to CSV": "JSON zu CSV",
      "JSON to XML": "JSON zu XML",
      "JSON to YAML": "JSON zu YAML",
      "JSON to HTML Table": "JSON zu HTML-Tabelle",
      "JSON Compare": "JSON vergleichen",
      "JSON Sort Keys": "JSON-Schlussel sortieren",
      "Base64 Encode": "Base64 kodieren",
      "Base64 Decode": "Base64 dekodieren",
      "URL Encode": "URL kodieren",
      "URL Decode": "URL dekodieren",
      "HTML Encode/Decode": "HTML kodieren/dekodieren",
      "JWT Decoder": "JWT Decoder",
      "Text to Base64": "Text zu Base64",
      "Unicode Converter": "Unicode-Konverter",
      "String Comparison": "String-Vergleich",
      "Password Generator": "Passwort-Generator",
      "Word Counter": "Wortzahler",
      "SQL Formatter": "SQL-Formatter",
      "Age Calculator": "Altersrechner",
      "Time Between Dates": "Zeit zwischen Daten",
      "Image to Base64": "Bild zu Base64",
      "Base64 to Image": "Base64 zu Bild",
      "Session Vault": "Session-Tresor",
      "Pro Image Tool": "Pro Bild-Tool",
      "Security Tools": "Sicherheits-Tools",
    },
    ru: {
      "Image Compressor": "Сжатие изображений",
      "JSON Formatter": "Форматтер JSON",
      "JSON Validator": "Валидатор JSON",
      "JSON Minifier": "Минификатор JSON",
      "JSON Pretty Print": "JSON Pretty Print",
      "JSON to CSV": "JSON в CSV",
      "JSON to XML": "JSON в XML",
      "JSON to YAML": "JSON в YAML",
      "JSON to HTML Table": "JSON в HTML-таблицу",
      "JSON Compare": "Сравнение JSON",
      "JSON Sort Keys": "Сортировка ключей JSON",
      "Base64 Encode": "Base64 кодирование",
      "Base64 Decode": "Base64 декодирование",
      "URL Encode": "URL кодирование",
      "URL Decode": "URL декодирование",
      "HTML Encode/Decode": "HTML код/декод",
      "JWT Decoder": "JWT декодер",
      "Text to Base64": "Текст в Base64",
      "Unicode Converter": "Конвертер Unicode",
      "String Comparison": "Сравнение строк",
      "Password Generator": "Генератор паролей",
      "Word Counter": "Счетчик слов",
      "SQL Formatter": "Форматтер SQL",
      "Age Calculator": "Калькулятор возраста",
      "Time Between Dates": "Разница дат",
      "Image to Base64": "Изображение в Base64",
      "Base64 to Image": "Base64 в изображение",
      "Session Vault": "Сейф сессии",
      "Pro Image Tool": "Про инструмент изображений",
      "Security Tools": "Инструменты безопасности",
    },
    ta: {
      "Image Compressor": "பட சுருக்கி",
      "JSON Formatter": "JSON வடிவமைப்பான்",
      "JSON Validator": "JSON சரிபார்ப்பான்",
      "JSON Minifier": "JSON சுருக்கி",
      "JSON Pretty Print": "JSON அழகுபடுத்தல்",
      "JSON to CSV": "JSON முதல் CSV",
      "JSON to XML": "JSON முதல் XML",
      "JSON to YAML": "JSON முதல் YAML",
      "JSON to HTML Table": "JSON முதல் HTML அட்டவணை",
      "JSON Compare": "JSON ஒப்பீடு",
      "JSON Sort Keys": "JSON விசைகள் வரிசை",
      "Base64 Encode": "Base64 எண்கோடு",
      "Base64 Decode": "Base64 டிகோடு",
      "URL Encode": "URL எண்கோடு",
      "URL Decode": "URL டிகோடு",
      "HTML Encode/Decode": "HTML எண்கோடு/டிகோடு",
      "JWT Decoder": "JWT டிகோடர்",
      "Text to Base64": "உரை முதல் Base64",
      "Unicode Converter": "Unicode மாற்றி",
      "String Comparison": "சரம் ஒப்பீடு",
      "Password Generator": "கடவுச்சொல் உருவாக்கி",
      "Word Counter": "வார்த்தை எண்ணி",
      "SQL Formatter": "SQL வடிவமைப்பான்",
      "Age Calculator": "வயது கணிப்பான்",
      "Time Between Dates": "தேதிகளுக்கிடை நேரம்",
      "Image to Base64": "படம் முதல் Base64",
      "Base64 to Image": "Base64 முதல் படம்",
      "Session Vault": "செஷன் வால்ட்",
      "Pro Image Tool": "புரோ படம் கருவி",
      "Security Tools": "பாதுகாப்பு கருவிகள்",
    },
  };

  const map = maps[loc];
  return map?.[toolName] ?? toolName;
}

export function buildToolSeoPage(config: ToolSeoConfig, opts?: { locale?: SupportedLocale }): ToolSeoPage {
  const locale = normLocale(opts?.locale);

  const override =
    config.locales?.[opts?.locale ?? "en"] ??
    config.locales?.[locale] ??
    config.locales?.[(locale.split("-")[0] as SupportedLocale)];

  const merged: ToolSeoConfig = { ...config, ...(override ?? {}) };
  const useCustom = locale === "en" || !!override;

  const toolName = (!useCustom) ? translateToolName(locale, merged.toolName) : merged.toolName;
  const seoTitle = (useCustom ? merged.seoTitle : undefined) ?? defaultTitle(toolName, merged.mainKeyword);
  const metaDescription = (useCustom ? merged.metaDescription : undefined) ?? localizedMeta(locale, merged.mainKeyword, toolName);

  return {
    seoTitle,
    metaDescription,
    h1: `${toolName}: ${merged.mainKeyword}`,
    intro: (useCustom ? merged.intro : undefined) ?? localizedIntro(locale, toolName, merged.mainKeyword, merged.secondaryKeywords),
    howToSteps: (useCustom ? merged.howToSteps : undefined) ?? localizedHowTo(locale, toolName),
    features: (useCustom ? merged.features : undefined) ?? localizedFeatures(locale, toolName, merged.mainKeyword),
    benefits: (useCustom ? merged.benefits : undefined) ?? localizedBenefits(locale, merged.mainKeyword),
    faqs: (useCustom ? merged.faqs : undefined) ?? localizedFaqs(locale, toolName, merged.mainKeyword),
    internalLinks: (useCustom ? merged.internalLinks : undefined) ?? localizedLinks(locale, merged.urlSlug),
    cta: (useCustom ? merged.cta : undefined) ?? localizedCta(locale, toolName, merged.urlSlug, merged.mainKeyword),
    urlSlug: merged.urlSlug,
    imageAltText: merged.imageAltText,
    mainKeyword: merged.mainKeyword,
    secondaryKeywords: merged.secondaryKeywords,
    toolName,
  };
}

export function buildFaqJsonLd(toolName: string, faqs: ToolFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
    // A small hint for maintainers; ignored by parsers.
    name: `${toolName} FAQ`,
  };
}
