import Reveal from "@/components/Reveal";

const groups = [
  {
    title: "Language & Framework",
    items: ["Java 17", "Spring Boot", "Spring AI", "JPA / Hibernate", "Python", "FastAPI"],
  },
  {
    title: "Messaging & Cache",
    items: ["Kafka", "Redis Streams", "Redis Lua", "Outbox", "DLT", "Redisson"],
  },
  {
    title: "Database",
    items: ["MySQL", "TimescaleDB", "Chroma VectorDB"],
  },
  {
    title: "Reliability",
    items: ["Resilience4j", "Circuit Breaker", "Rate Limiter", "Graceful Shutdown"],
  },
  {
    title: "Infra & Observability",
    items: ["Docker", "Jenkins", "Grafana", "Prometheus", "Loki"],
  },
  {
    title: "Test",
    items: ["JUnit5", "pytest", "K6", "Hibernate Statistics"],
  },
];

/**
 * 2열 정의 목록. 항목 사이에 border-t 하나만 두고 마지막 아래를 닫지 않는다.
 */
export default function Skills() {
  return (
    <section id="skills" className="px-6 pb-50 md:px-16">
      <h2 className="text-caption text-dim">
        <span className="font-mono">Stack</span>
      </h2>

      <dl className="mt-16">
        {groups.map((group, i) => (
          <Reveal key={group.title} as="div" mode="fade" delay={i * 0.04}>
            <div className="grid grid-cols-1 gap-2 border-t border-line py-6 md:grid-cols-12 md:gap-10">
              <dt className="text-caption text-dim md:col-span-3">
                <span className="font-mono">{group.title}</span>
              </dt>
              <dd className="flex flex-wrap gap-x-6 gap-y-2 text-caption md:col-span-8 md:col-start-5">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
