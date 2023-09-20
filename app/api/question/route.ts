import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  // content: "escribe como si fueras tartamudo."
  // content: "Vas a crear un generador de prompts profesionales para ChatGPT tomando el rol de ingeniero de prompt. Tu objetivo es crear el mejor prompt para escribir un texto haciéndome las preguntas correctas. Hazme 1 pregunta y no sigas hasta que responda, de forma corta y concisa. No enumeres tus preguntas. Tienes prohibido sugerirme imágenes, gráficos o cualquier otro elemento visual, así como citas de expertos. Para conseguirlo vas a seguir estos pasos: 1. En primer lugar vas a preguntarme por la temática sobre la que quiero crear el texto, 2. Cuando sepas la temática, quiero que me muestres 3 posibles roles profesionales que puedan redactar este texto, 3. Cuando sepas el rol profesional, quiero que me des 3 posibles contenidos del texto, de forma breve, concisa y clara, 4. Cuando sepas el contenido del texto, quiero que me des 3 posibles tipos de redacción que encajen con todas las ordenes que te he dado hasta ahora, 5. Cuando sepas el tipo de redacción, vas a darme 3 opciones para mejorar la estructura del texto, 6. Finalmente cuando sepas la estructura del texto, vas a darme 3 posibles detalles que puedan mejorar el texto, 7. Ahora tienes que analizar toda la información recibida y mostrarme el formato final del prompt, el cual deben ser ordenes claras y concisas, incluyendo que en el texto introduzca tablas de varias filas, listas y diferentes tipos de encabezados. Comenzará cuando yo escriba la palabra start"

  // content: "Vas a crear un sistema generador de preguntas procedimentales para ChatGPT tomando el rol de analista de información. Tu objetivo es a partir del texto que se te proporcione plantear un problema y su solución. Para conseguirlo vas a seguir estas instrucciones: 1- El docente ingresará un contenido del cual quiere medir el conocimiento de sus alumnos. 2- Al ingresar el texto tu crearás un planteamiento para un desafío acerca de ese contenido, en no mas de 50 palabras. 3- La respuesta deberá ser construida por el alumno seleccionando 3 opciones en el orden correcto. 4- Tu crearás 5 opciones diferentes para el alumno, el alumno elegirá de estas 5 opciones elegir 3 en el orden correcto, solo así se tendrá éxito en la respuesta, las opciones tendrán un máximo de 25 palabras cada una. Esperarás hasta que te entregue el texto y limítate a escribir los siguiente: 'Planteamiento:', 'Opción 1:', 'Opción 2:', 'Opción 3:', 'Opción 4:', 'Opción 5:',  'Respuesta correcta:'. Ahora soy el docente y el contenido que te entrego es: "
  // content: "Vas a crear un sistema generador de preguntas para ChatGPT tomando el rol de analista de información. Tu objetivo es a partir del texto que se te proporcione plantear un problema y su solución. Para conseguirlo vas a seguir estas instrucciones: 1- El docente ingresará un contenido del cual quiere medir el conocimiento de sus alumnos. 2- Al ingresar el texto tu crearás un planteamiento para una pregunta acerca de ese contenido, en no mas de 50 palabras. 3-  Tu crearás 4 alterntivas diferentes para el alumno, el alumno deberá elegir la única opción correcto, solo así se tendrá éxito en la respuesta, las opciones tendrán un máximo de 25 palabras cada una. Esperarás hasta que te entregue el texto y limítate a escribir los siguiente: 'Planteamiento:', 'Opción 1:', 'Opción 2:', 'Opción 3:', 'Opción 4:', 'Opción 5:',  'Respuesta correcta:'. Ahora soy el docente y el contenido que te entrego es: "
  content: "A partír del texto que te proporcione, desarrollarás una pregunta de selección, me la entregarás en formto json con la siguiente estructura: 'planteamiento: (en no mas de 350 caracteres', 'alternativas: 1 ... 4 (en no mas de 250 caracteres cada una)' "

};

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages]
    });

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log('[CODE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};