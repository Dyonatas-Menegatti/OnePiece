interface GeminiResponse {
	candidates: {
		content: {
			parts: { text: string }[];
		};
	}[];
}

export interface InsightData {
	feasibility: {
		status: 'viable' | 'needs_adjustment' | 'unfeasible';
		content: string;
	};
	diagnosis: {
		content: string;
	};
	suggestions: {
		items: string[];
	};
	extraIcome: {
		items: string[];
	};
	investment: {
		items: string[];
	};
	motivation: {
		content: string;
	};
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY?.trim();

if (!API_KEY) {
	throw new Error(
		'VITE_GEMINI_API_KEY não foi encontrada. Crie um arquivo .env.local na raiz do projeto e reinicie o Vite.',
	);
}

const MODEL_NAME = 'gemini-flash-latest';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

const callGeminiAPI = async (prompt: string) => {
	const response = await fetch(GEMINI_API_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			contents: [{ parts: [{ text: prompt }] }],
		}),
	});

	const data = (await response.json()) as GeminiResponse & {
		error?: { message?: string };
	};

	if (!response.ok || data?.error) {
		throw new Error(data?.error?.message ?? `Erro na requisição: ${response.status}`);
	}

	return data as GeminiResponse;
};

export const getInsight = async (prompt: string) => {
	const response = await callGeminiAPI(prompt);
	const json = response.candidates[0].content.parts[0].text;
	const sanitizedJson = json.replace(/^```json\s*|\s*```$/g, '').trim();
	return JSON.parse(sanitizedJson) as InsightData;
};
