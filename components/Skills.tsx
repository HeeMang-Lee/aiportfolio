import Reveal from "@/components/Reveal";

const groups = [
  {
    title: "Backend",
    items: ["Java", "Spring Boot", "Spring AI", "JPA / Hibernate", "Python", "FastAPI"],
  },
  {
    title: "Database & Cache",
    items: ["MySQL", "TimescaleDB", "Redis Streams", "Redis Caching", "Redisson"],
  },
  {
    title: "AI 연동",
    items: ["Spring AI", "RAG (Chroma VectorDB)", "Claude API", "OpenAI API", "SSE Streaming"],
  },
  {
    title: "인프라 & 운영",
    items: ["Docker", "Jenkins", "Grafana", "Prometheus", "Loki"],
  },
  {
    title: "테스트",
    items: ["JUnit5", "pytest", "K6"],
  },
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="mx-auto max-w-page px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-ink">
            기술
          </h2>
        </Reveal>

        <dl className="mt-12">
          {groups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.04}>
              <div className="grid gap-2 border-t border-rule py-6 md:grid-cols-[180px_1fr] md:gap-10">
                <dt className="text-[11px] font-medium tracking-meta text-meta md:pt-1">
                  {group.title}
                </dt>
                <dd className="flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-body">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
