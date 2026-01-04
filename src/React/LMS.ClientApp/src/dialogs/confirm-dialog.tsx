import { Modal } from "bootstrap";
import { useEffect, useRef } from "react";


type Props = {
    id: string;
    message: string;
    closed: (res: boolean) => void;
}

export default function ConfirmDialog({ id, message, closed } : Props) {

    const element = useRef<HTMLDivElement | null>(null);
    const result = useRef(false);

    useEffect(() => {
        const closeHandler = () => closed(result.current);

        element.current?.addEventListener('hidden.bs.modal', closeHandler);

        return () => element.current?.removeEventListener('hidden.bs.modal', closeHandler);
    }, []);

    return(
        <div id={id} className="modal fade" tabIndex={-1} aria-hidden="true" ref={element}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Confirm</h5>
                    <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    />
                </div>

                <div className="modal-body">{ message }</div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => {
                        result.current = true;
                        Modal.getOrCreateInstance(element.current as Element).hide();
                    }}>
                    Yes
                    </button>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                    No
                    </button>
                </div>
                </div>
            </div>
        </div>
    );

}