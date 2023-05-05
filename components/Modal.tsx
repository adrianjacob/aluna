import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames/bind";
import styles from "./Modal.module.scss";

const cx = classNames.bind(styles);

const Modal = forwardRef(({ children }, ref) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const close = useCallback(() => {
    setIsVisible(false);
  }, []);
  const modalRef = useRef(null);
  useImperativeHandle(ref, () => {
    return {
      open: () => {
        setIsVisible(!isVisible);
      },
      close,
    };
  });
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser && isVisible) {
    return (
      isVisible && (
        <>
          <section
            data-testid="modal"
            className={cx("modal")}
            onClick={(e) => {
              // if (e.target.dataset.testid) {
              //   close();
              // }
            }}
          >
            <div
              className={cx("dialog")}
              role="dialog"
              aria-modal="true"
              ref={modalRef}
            >
              <div className={cx("close")}>
                <button onClick={close}>x</button>
              </div>

              <div>{children}</div>
            </div>
          </section>
        </>
      )
    );
  } else {
    return null;
  }
});

export { Modal as default };
