import { SingInForm } from "../../_components/sign-in-form";

type Props = {
    searchParams?: Record<"callbackUrl" | "error", string>
}


const SignInPage = (props: Props) => {
    return ( 
        <SingInForm error={props.searchParams?.error} callbackUrl={props.searchParams?.callbackUrl} />
     );
}
 
export default SignInPage;