import axios from "axios";
interface ContactInput {
    name: string;
    email: string;
    company: string;
    message: string;
}
export default async function contact(input: ContactInput) {
    const response = await axios.post("http://localhost:5678/webhook-test/aae10248-062d-4af6-9c57-4ced6411c81c", {
        "message": {
            "name": input.name,
            "email": input.email,
            "company": input.company,
            "message": input.message,
        }
    });
    if (response.status !== 200) {
        throw new Error('Failed to send contact request');
    }
    return { success: true, message: 'Contact request sent successfully' };
}