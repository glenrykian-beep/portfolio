import React from 'react';
import { 
  Github, 
  Database, 
  Workflow, 
  Bot, 
  Webhook, 
  MessageSquare, 
  FileSpreadsheet, 
  PieChart, 
  Sparkles, 
  Zap, 
  Layers, 
  GitBranch, 
  Code,
  FileCheck2,
  Terminal,
  Activity
} from 'lucide-react';

// SVG Icons for known technologies
const HtmlIcon = () => (
  <svg className="w-4 h-4 text-[#E34F26]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm17.9 4.3H4.6l.4 4.5h13.9l-.4 4.5-6.5 1.8-6.5-1.8-.2-2.3H2.8l.5 5.6 8.7 2.4 8.7-2.4 1.2-14.7z"/>
  </svg>
);

const CssIcon = () => (
  <svg className="w-4 h-4 text-[#1572B6]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm17.7 5.2H4.8l.3 3.6h13.8l-.4 4.5-6.5 1.8-6.5-1.8-.3-3H2.8l.5 6.3 8.7 2.4 8.7-2.4 1.5-15.4z"/>
  </svg>
);

const JsIcon = () => (
  <svg className="w-4 h-4 text-[#F7DF1E]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 0h24v24H0V0zm11.5 16.5c0 2.2-1.3 3.3-3.3 3.3-1.8 0-2.8-.9-3.2-1.8l1.8-1.1c.3.5.7.9 1.4.9.8 0 1.3-.4 1.3-1.3V9.5h2v7zm8.3-1c-.4.9-1.2 1.6-2.4 1.6-1.5 0-2.5-.9-2.5-2.5 0-2.2 1.8-2.6 3.1-3.1l.1-.1c.3-.1.6-.3.6-.7 0-.5-.4-.8-1.1-.8-.8 0-1.2.4-1.4 1l-1.8-1c.5-1.1 1.6-1.8 3.2-1.8 1.9 0 3.1 1 3.1 2.7 0 .5-.1 1-.1 1.4-.1.7-.1 1.4.2 1.8l-1.4.5c-.1-.3-.2-.5-.3-.9z"/>
  </svg>
);

const PythonIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path fill="#3776AB" d="M11.9 1c-4.2 0-3.9 1.8-3.9 1.8v1.9h7.9v1.1H5.7s-2.8.3-2.8 4.2c0 3.8 2.5 4 2.5 4h1.5v-2c0-2.3 2-2.3 2-2.3h7.8c2.1 0 2.1-2 2.1-2V2.8S19.1 1 11.9 1zm-2.2 1.6c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" />
    <path fill="#FFD43B" d="M12.1 23c4.2 0 3.9-1.8 3.9-1.8v-1.9H8.1v-1.1h10.2s2.8-.3 2.8-4.2c0-3.8-2.5-4-2.5-4h-1.5v2c0 2.3-2 2.3-2 2.3H7.3c-2.1 0-2.1 2-2.1 2v5.2s-.3 1.8 6.9 1.8zm2.2-1.6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
  </svg>
);

const GitIcon = () => (
  <svg className="w-4 h-4 text-[#F05032]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.6 10.9L13.1.4c-.6-.5-1.5-.5-2.1 0L8.6 2.8l3.1 3.1c.6-.2 1.3-.1 1.8.4.5.5.6 1.2.4 1.8l3 3c.6-.2 1.3-.1 1.8.4.8.8.8 2.1 0 2.9s-2.1.8-2.9 0c-.5-.5-.6-1.3-.4-1.9l-2.8-2.8v5.7c.2.2.4.4.5.7.8.8.8 2.1 0 2.9s-2.1.8-2.9 0c-.8-.8-.8-2.1 0-2.9.3-.3.7-.5 1.1-.6v-5.8c-.4-.1-.8-.3-1.1-.6-.6-.6-.7-1.4-.4-2.1L7.1 5.2.4 11.9c-.6.6-.6 1.5 0 2.1l10.5 10.5c.6.6 1.5.6 2.1 0l10.5-10.5c.6-.6.6-1.5.1-2.1z"/>
  </svg>
);

const VsCodeIcon = () => (
  <svg className="w-4 h-4 text-[#007ACC]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.27a1 1 0 0 0-.014 1.488L4.62 12 .313 15.242a1 1 0 0 0 .014 1.488l1.322 1.211a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63c.47.43 1.15.56 1.705.29l4.94-2.377A1.5 1.5 0 0 0 24 20.06V3.94a1.5 1.5 0 0 0-.85-1.353zm-6.65 14.288L9.89 12l6.61-4.875v9.75z"/>
  </svg>
);

const PowerBiIcon = () => (
  <svg className="w-4 h-4 text-[#F2C811]" viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="12" width="4" height="9" rx="1" />
    <rect x="8" y="8" width="4" height="13" rx="1" />
    <rect x="14" y="4" width="4" height="17" rx="1" />
    <rect x="20" y="1" width="3" height="20" rx="1" />
  </svg>
);

const ExcelIcon = () => (
  <svg className="w-4 h-4 text-[#217346]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.17 2.06H7.83a2.006 2.006 0 0 0-2 2v2.79h10.34a1.5 1.5 0 0 1 1.5 1.5v8.32h3.5a2.006 2.006 0 0 0 2-2V4.06a2.006 2.006 0 0 0-2-2z"/>
    <path d="M16.17 7.35H2.83a2.006 2.006 0 0 0-2 2v10.59a2.006 2.006 0 0 0 2 2h13.34a2.006 2.006 0 0 0 2-2V9.35a2.006 2.006 0 0 0-2-2zm-4.7 10.32l-1.97-3.48-1.97 3.48H5.21l3.05-4.84-2.9-4.52h2.36l1.79 3.23 1.78-3.23h2.34l-2.88 4.54 3.03 4.82h-2.31z"/>
  </svg>
);

export default function Skills() {
  const skillCategories = [
    {
      title: 'Programming & Web',
      description: 'Foundations of web applications, frontend styling, backend logic, and automated delivery pipelines.',
      skills: [
        { name: 'HTML5', icon: HtmlIcon },
        { name: 'CSS3', icon: CssIcon },
        { name: 'JavaScript', icon: JsIcon },
        { name: 'Python', icon: PythonIcon },
        { name: 'CI/CD', icon: RefreshCwIcon },
      ],
    },
    {
      title: 'Data Analytics',
      description: 'Transforming raw information into clean databases, structured queries, and executive dashboards.',
      skills: [
        { name: 'SQL', icon: DatabaseIcon },
        { name: 'Power BI', icon: PowerBiIcon },
        { name: 'Excel', icon: ExcelIcon },
        { name: 'Data Cleaning', icon: FilterIcon },
        { name: 'Data Visualization', icon: ChartIcon },
      ],
    },
    {
      title: 'AI & Automation',
      description: 'Designing autonomous workflows, intelligent AI agents, and integrating multi-platform APIs.',
      skills: [
        { name: 'Workflow Automation', icon: WorkflowIcon },
        { name: 'AI Agents', icon: BotIcon },
        { name: 'API Integration', icon: WebhookIcon },
        { name: 'Chatbots', icon: MessageSquareIcon },
      ],
    },
    {
      title: 'Tools & Platforms',
      description: 'Industry-standard developer environments, version control, and leading automation platforms.',
      skills: [
        { name: 'Git', icon: GitIcon },
        { name: 'GitHub', icon: GithubIcon },
        { name: 'VS Code', icon: VsCodeIcon },
        { name: 'n8n', icon: N8nIcon },
        { name: 'Make', icon: MakeIcon },
        { name: 'Zapier', icon: ZapierIcon },
        { name: 'GHL', icon: GhlIcon },
      ],
    },
  ];

  function RefreshCwIcon() {
    return <Activity className="w-4 h-4 text-emerald-500" />;
  }

  function DatabaseIcon() {
    return <Database className="w-4 h-4 text-blue-500" />;
  }

  function FilterIcon() {
    return <FileCheck2 className="w-4 h-4 text-teal-500" />;
  }

  function ChartIcon() {
    return <PieChart className="w-4 h-4 text-indigo-500" />;
  }

  function WorkflowIcon() {
    return <Workflow className="w-4 h-4 text-accent" />;
  }

  function BotIcon() {
    return <Bot className="w-4 h-4 text-purple-500" />;
  }

  function WebhookIcon() {
    return <Webhook className="w-4 h-4 text-rose-500" />;
  }

  function MessageSquareIcon() {
    return <MessageSquare className="w-4 h-4 text-cyan-500" />;
  }

  function GithubIcon() {
    return <Github className="w-4 h-4 text-gray-800 dark:text-gray-100" />;
  }

  function N8nIcon() {
    return (
      <div className="w-4 h-4 rounded-sm bg-[#EA4B71] flex items-center justify-center text-[9px] font-bold text-white">
        n8
      </div>
    );
  }

  function MakeIcon() {
    return (
      <div className="w-4 h-4 rounded-sm bg-[#6F3FF5] flex items-center justify-center text-[9px] font-bold text-white">
        M
      </div>
    );
  }

  function ZapierIcon() {
    return <Zap className="w-4 h-4 text-[#FF4A00]" />;
  }

  function GhlIcon() {
    return <Layers className="w-4 h-4 text-blue-600" />;
  }

  return (
    <section id="skills" className="py-20 bg-gray-50/50 dark:bg-dark-secondary/50 border-y border-gray-200 dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs sm:text-sm uppercase tracking-widest text-accent font-semibold mb-2">
            Technical Competencies
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-dark-text tracking-tight mb-4">
            Skills &amp; Expertise
          </h3>
          <p className="text-gray-600 dark:text-dark-muted text-base sm:text-lg">
            A comprehensive overview of programming languages, analytics toolsets, automation platforms, and development workflows.
          </p>
        </div>

        {/* 2x2 Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border hover:border-accent/50 dark:hover:border-accent/40 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                <h4 className="text-xl font-bold text-gray-900 dark:text-dark-text">
                  {category.title}
                </h4>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-dark-muted mb-6 leading-relaxed">
                {category.description}
              </p>

              {/* Skills Badges */}
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, sIdx) => {
                  const IconComponent = skill.icon;
                  return (
                    <div
                      key={sIdx}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 dark:bg-dark-secondary border border-gray-200/90 dark:border-dark-border hover:border-accent/50 dark:hover:border-accent/50 text-gray-800 dark:text-gray-200 text-xs sm:text-sm font-medium transition-all duration-150 hover:scale-105"
                    >
                      <IconComponent />
                      <span>{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
