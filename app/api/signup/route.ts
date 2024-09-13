import { signupSchema } from "@/app/lib/schemas/signup-schema";
import { stringifyError } from "@/app/utils";

export async function POST(request: Request) {
  try {
    const data = await request.json(); // Parse the JSON body
    const validatedData = signupSchema.parse(data); // Validate the data using Zod

    // Log and handle the validated data
    console.log("Validated Data:", validatedData);

    // Perform your logic, e.g., saving to database
    // For now, return a success message
    return new Response(JSON.stringify({ message: "Signup successful" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Return validation error with issues
    return new Response(stringifyError(error), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
