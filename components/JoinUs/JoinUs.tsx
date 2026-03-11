"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { type ContactClientInput, contactClientSchema } from "@/lib/validation/contact";
import styles from "@/components/JoinUs/JoinUs.module.css";

type SubmitState = {
  status: "idle" | "success" | "error";
  message: string;
};

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export const JoinUs = () => {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: ""
  });

  const {
    register,
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ContactClientInput>({
    resolver: zodResolver(contactClientSchema),
    defaultValues: {
      name: "",
      email: "",
      interest: "Contributing",
      message: "",
      website: ""
    }
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitState({ status: "idle", message: "" });

    if (!turnstileToken) {
      setError("root", {
        type: "manual",
        message: "Please verify Turnstile before submitting."
      });
      return;
    }

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...values,
        turnstileToken
      })
    });

    const payload = (await response.json()) as {
      message?: string;
      issues?: string[];
    };

    if (!response.ok) {
      setSubmitState({
        status: "error",
        message: payload.message ?? "Submission failed. Please try again."
      });
      setTurnstileToken("");
      setTurnstileResetKey((key) => key + 1);
      return;
    }

    setSubmitState({
      status: "success",
      message: payload.message ?? "Thanks. We will reach out soon."
    });
    reset();
    setTurnstileToken("");
    setTurnstileResetKey((key) => key + 1);
  });

  return (
    <section id="join" className={styles.join} aria-labelledby="join-title">
      <div className={styles.copyPanel}>
        <p className={styles.kicker}>Contributor Network</p>
        <h2 id="join-title" className={styles.title}>
          Help us build the future.
        </h2>
        <p className={styles.description}>
          If you are done with SaaS lock-in, endless subscriptions, and surveillance
          growth hacks, build with us. Lyfie is led by Rahul N. Anand as creator and BDFL,
          and powered by contributors who believe better software should remain free and
          open.
        </p>
        <p className={styles.links}>
          <a
            href="https://github.com/lyfie-org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore GitHub
            <ArrowUpRight size={15} weight="bold" aria-hidden />
          </a>
          <a href="https://rahulnsanand.com" target="_blank" rel="noopener noreferrer">
            Rahul N. Anand
            <ArrowUpRight size={15} weight="bold" aria-hidden />
          </a>
        </p>
      </div>

      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.row}>
          <label className={styles.field}>
            Name
            <input type="text" autoComplete="name" {...register("name")} />
            {errors.name ? <span>{errors.name.message}</span> : null}
          </label>

          <label className={styles.field}>
            Email
            <input type="email" autoComplete="email" {...register("email")} />
            {errors.email ? <span>{errors.email.message}</span> : null}
          </label>
        </div>

        <label className={styles.field}>
          I am reaching out about
          <select {...register("interest")}>
            <option value="Contributing">Contributing</option>
            <option value="Product Feedback">Product Feedback</option>
            <option value="Partnership">Partnership</option>
            <option value="Press">Press</option>
            <option value="General">General</option>
          </select>
          {errors.interest ? <span>{errors.interest.message}</span> : null}
        </label>

        <label className={styles.field}>
          Message
          <textarea rows={6} {...register("message")} />
          {errors.message ? <span>{errors.message.message}</span> : null}
        </label>

        <label className={styles.honey}>
          Leave this empty
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>

        <div className={styles.turnstileWrap}>
          {turnstileSiteKey ? (
            <Turnstile
              key={turnstileResetKey}
              siteKey={turnstileSiteKey}
              onSuccess={(token) => setTurnstileToken(token)}
              onExpire={() => setTurnstileToken("")}
              onError={() => setTurnstileToken("")}
              options={{
                theme: "auto",
                size: "flexible"
              }}
            />
          ) : (
            <p className={styles.turnstileError}>
              Missing `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
            </p>
          )}
        </div>

        {errors.root ? <p className={styles.error}>{errors.root.message}</p> : null}
        {submitState.status === "error" ? (
          <p className={styles.error}>{submitState.message}</p>
        ) : null}
        {submitState.status === "success" ? (
          <p className={styles.success}>{submitState.message}</p>
        ) : null}

        <button
          className={styles.submit}
          type="submit"
          disabled={isSubmitting || !turnstileSiteKey}
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
      </form>
    </section>
  );
};
