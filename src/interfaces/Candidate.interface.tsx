//An interface for the Candidate objects returned by the API
export default interface Candidate {
    readonly login: string;
    readonly avatar_url: string | undefined;
    readonly name: string | null;
    readonly location: string | null;
    readonly company: string | null;
    readonly email: string | null;
    readonly bio: string | null;
}
