import { actions } from "astro:actions";
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { PhotoTags } from "../../types";
import { lowQualityPhotoUrl } from "../../utils/cloudinaryHelpers";
import { fileToUri } from "../../utils/formatFiles";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../../utils/localStorage";
import PartyIcon from "./icons/Party";
import SignMessageIcon from "./icons/SignMessage";
import "./styles/UploadForm.css";

interface Props {}

const UploadForm = ({}: Props) => {
  const [form, setForm] = useState({
    tag: PhotoTags.SIGNATURES,
    message: "",
    photoUri: "",
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [disableSignature, setDisableSignature] = useState(false);

  const hideMessage = useMemo(() => {
    return form.tag === PhotoTags.PARTY;
  }, [form.tag]);

  const disableButton = useMemo(() => {
    return (
      isLoading ||
      (!form.message && form.tag === PhotoTags.SIGNATURES) ||
      !form.photoUri
    );
  }, [form.message, form.photoUri, isLoading, form.tag]);

  useEffect(() => {
    checkIfHasSendSignaturePhoto();
  }, []);

  const checkIfHasSendSignaturePhoto = () => {
    const hasSentSignaturePhoto = Boolean(
      loadFromLocalStorage("hasSentSignaturePhoto"),
    );

    if (hasSentSignaturePhoto) {
      setDisableSignature(true);
      if (form.tag === PhotoTags.SIGNATURES) {
        setForm({ ...form, tag: PhotoTags.PARTY });
      }
    }
  };

  const handleSelectFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const uri = await fileToUri(file);
      setForm({ ...form, photoUri: uri });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRadioChange = (tag: PhotoTags) => {
    if (tag === PhotoTags.SIGNATURES && disableSignature) return;

    setForm({ ...form, tag });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const { photo } = await actions.uploadPhoto.orThrow({
        uri: form.photoUri,
        photoTag: form.tag,
        message: form.message,
      });

      saveToLocalStorage("hasSentSignaturePhoto", "true");
      resetForm();
    } catch (e) {
      alert(
        "Ha ocurrido un error al subir la imagen. Por favor, intentá nuevamente.",
      );
    } finally {
      setIsLoading(false);
      checkIfHasSendSignaturePhoto();
    }
  };

  const resetForm = () => {
    const initialTag = disableSignature
      ? PhotoTags.PARTY
      : PhotoTags.SIGNATURES;
    setForm({ tag: initialTag, message: "", photoUri: "" });
    fileInputRef.current!.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="photo-tag-options">
        <label className="tag-option" htmlFor="tag-signature">
          <section>
            <SignMessageIcon size={60} stroke="var(--color-primary)" />
            <input
              style={{ accentColor: "var(--color-primary)" }}
              type="radio"
              name="tag"
              id="tag-signature"
              value={PhotoTags.SIGNATURES}
              checked={form.tag === PhotoTags.SIGNATURES}
              onChange={() => handleRadioChange(PhotoTags.SIGNATURES)}
              disabled={disableSignature}
            />
          </section>
          Cuadro de Firmas
        </label>

        <label className="tag-option" htmlFor="tag-party">
          <section>
            <PartyIcon size={60} stroke="var(--color-secondary)" />
            <input
              style={{ accentColor: "var(--color-secondary)" }}
              className="secondary"
              type="radio"
              name="tag"
              id="tag-party"
              value={PhotoTags.PARTY}
              checked={form.tag === PhotoTags.PARTY}
              onChange={() => handleRadioChange(PhotoTags.PARTY)}
            />
          </section>
          Durante la Fiesta
        </label>
      </div>

      <div className={`photo-message ${hideMessage ? "hidden" : ""}`}>
        <textarea
          name="message"
          rows={4}
          placeholder="Escribí un mensajito para los novios..."
          className={hideMessage ? "hidden" : ""}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        ></textarea>
      </div>

      <div
        className="photo-upload"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleSelectFile}
        />
        {isLoading && (
          <div className="loader-overlay">
            <div className="loader" />
          </div>
        )}
        {!form.photoUri ? (
          <span>Seleccionar foto para subir</span>
        ) : (
          <picture>
            <img src={lowQualityPhotoUrl(form.photoUri)} />
          </picture>
        )}
      </div>

      <div className="button-container">
        <button
          className={form.tag === PhotoTags.PARTY ? "secondary" : ""}
          disabled={disableButton}
          type="submit"
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default UploadForm;
