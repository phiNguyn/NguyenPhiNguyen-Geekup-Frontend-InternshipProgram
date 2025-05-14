import { useNavigate as useReactNavigate } from 'react-router-dom';

interface NavigateOptions {
    replace?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state?: any;
}

export const useNavigate = () => {
    const navigate = useReactNavigate();

    const goTo = (path: string, options?: NavigateOptions) => {
        if (options?.replace) {
            navigate(path, { replace: true, state: options.state });
        } else {
            navigate(path, { state: options?.state });
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    const goForward = () => {
        navigate(1);
    };

    return {
        goTo,
        goBack,
        goForward,
    };
};
