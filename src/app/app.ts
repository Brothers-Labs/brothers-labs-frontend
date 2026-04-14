import { CommonModule, DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

type StatKey = 'projects' | 'stack' | 'uptime' | 'acceleration';
type LanguageCode = 'pt' | 'en';

interface NavItem {
  readonly id: string;
  readonly labelKey: string;
}

interface HighlightItem {
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly icon: string;
}

interface ServiceItem {
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly icon: string;
}

interface DifferentiatorItem {
  readonly titleKey: string;
  readonly descriptionKey: string;
}

interface MetricItem {
  readonly key: StatKey;
  readonly target: number;
  readonly suffix: string;
  readonly labelKey: string;
  readonly descriptionKey: string;
}

interface TechnologyItem {
  readonly nameKey: string;
  readonly categoryKey: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, TranslateModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit, OnDestroy {
  @ViewChild('metricsSection')
  private metricsSection?: ElementRef<HTMLElement>;

  readonly companyName = 'Brothers Labs';
  readonly availableLanguages: ReadonlyArray<LanguageCode> = ['pt', 'en'];

  readonly navItems: ReadonlyArray<NavItem> = [
    { id: 'sobre', labelKey: 'nav.about' },
    { id: 'servicos', labelKey: 'nav.services' },
    { id: 'diferenciais', labelKey: 'nav.differentials' },
    { id: 'tecnologias', labelKey: 'nav.technologies' },
    { id: 'contato', labelKey: 'nav.contact' }
  ];

  readonly highlights: ReadonlyArray<HighlightItem> = [
    {
      titleKey: 'about.highlights.ai.title',
      descriptionKey: 'about.highlights.ai.description',
      icon: 'psychology'
    },
    {
      titleKey: 'about.highlights.frontend.title',
      descriptionKey: 'about.highlights.frontend.description',
      icon: 'web'
    },
    {
      titleKey: 'about.highlights.architecture.title',
      descriptionKey: 'about.highlights.architecture.description',
      icon: 'lan'
    }
  ];

  readonly services: ReadonlyArray<ServiceItem> = [
    {
      titleKey: 'services.items.systems.title',
      descriptionKey: 'services.items.systems.description',
      icon: 'developer_mode'
    },
    {
      titleKey: 'services.items.ai.title',
      descriptionKey: 'services.items.ai.description',
      icon: 'smart_toy'
    },
    {
      titleKey: 'services.items.angular.title',
      descriptionKey: 'services.items.angular.description',
      icon: 'design_services'
    },
    {
      titleKey: 'services.items.node.title',
      descriptionKey: 'services.items.node.description',
      icon: 'api'
    },
    {
      titleKey: 'services.items.architecture.title',
      descriptionKey: 'services.items.architecture.description',
      icon: 'account_tree'
    },
    {
      titleKey: 'services.items.saas.title',
      descriptionKey: 'services.items.saas.description',
      icon: 'cloud_done'
    }
  ];

  readonly differentiators: ReadonlyArray<DifferentiatorItem> = [
    {
      titleKey: 'differentials.items.modern.title',
      descriptionKey: 'differentials.items.modern.description'
    },
    {
      titleKey: 'differentials.items.scale.title',
      descriptionKey: 'differentials.items.scale.description'
    },
    {
      titleKey: 'differentials.items.performance.title',
      descriptionKey: 'differentials.items.performance.description'
    },
    {
      titleKey: 'differentials.items.design.title',
      descriptionKey: 'differentials.items.design.description'
    },
    {
      titleKey: 'differentials.items.innovation.title',
      descriptionKey: 'differentials.items.innovation.description'
    },
    {
      titleKey: 'differentials.items.multiple.title',
      descriptionKey: 'differentials.items.multiple.description'
    }
  ];

  readonly metrics: ReadonlyArray<MetricItem> = [
    {
      key: 'projects',
      target: 120,
      suffix: '+',
      labelKey: 'metrics.items.projects.label',
      descriptionKey: 'metrics.items.projects.description'
    },
    {
      key: 'stack',
      target: 36,
      suffix: '+',
      labelKey: 'metrics.items.stack.label',
      descriptionKey: 'metrics.items.stack.description'
    },
    {
      key: 'uptime',
      target: 99,
      suffix: '%',
      labelKey: 'metrics.items.uptime.label',
      descriptionKey: 'metrics.items.uptime.description'
    },
    {
      key: 'acceleration',
      target: 4,
      suffix: 'x',
      labelKey: 'metrics.items.acceleration.label',
      descriptionKey: 'metrics.items.acceleration.description'
    }
  ];

  readonly technologies: ReadonlyArray<TechnologyItem> = [
    { nameKey: 'technologies.items.angular.name', categoryKey: 'technologies.items.angular.category' },
    { nameKey: 'technologies.items.typescript.name', categoryKey: 'technologies.items.typescript.category' },
    { nameKey: 'technologies.items.node.name', categoryKey: 'technologies.items.node.category' },
    { nameKey: 'technologies.items.ai.name', categoryKey: 'technologies.items.ai.category' },
    { nameKey: 'technologies.items.apis.name', categoryKey: 'technologies.items.apis.category' },
    { nameKey: 'technologies.items.html.name', categoryKey: 'technologies.items.html.category' },
    { nameKey: 'technologies.items.css.name', categoryKey: 'technologies.items.css.category' },
    { nameKey: 'technologies.items.architecture.name', categoryKey: 'technologies.items.architecture.category' }
  ];

  readonly currentYear = new Date().getFullYear();
  readonly whatsappUrl = 'https://wa.me/5547997716565';
  readonly githubProfileUrl = 'https://github.com/Brothers-Labs';
  readonly contactEmail = 'pf.souza15@gmail.com';

  isHeaderScrolled = false;
  currentLanguage: LanguageCode = 'pt';
  isContactModalOpen = false;
  hasTriedToSubmitContact = false;

  contactForm: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  animatedStats: Record<StatKey, number> = {
    projects: 0,
    stack: 0,
    uptime: 0,
    acceleration: 0
  };

  private readonly document = inject(DOCUMENT);
  private readonly translate = inject(TranslateService);
  private metricsObserver?: IntersectionObserver;
  private countersStarted = false;
  private animationFrameIds: number[] = [];

  constructor() {
    this.translate.addLangs(this.availableLanguages as string[]);
    this.translate.setDefaultLang('pt');

    const browserLanguage = this.translate.getBrowserLang();
    const normalizedLanguage: LanguageCode = browserLanguage === 'en' ? 'en' : 'pt';

    this.currentLanguage = normalizedLanguage;
    this.translate.use(normalizedLanguage);
    this.document.documentElement.lang = normalizedLanguage;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isHeaderScrolled = window.scrollY > 16;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isContactModalOpen) {
      this.closeContactModal();
    }
  }

  ngAfterViewInit(): void {
    if (!this.metricsSection) {
      return;
    }

    this.metricsObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !this.countersStarted) {
          this.startCounterAnimations();
          this.countersStarted = true;
          this.metricsObserver?.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    this.metricsObserver.observe(this.metricsSection.nativeElement);
  }

  ngOnDestroy(): void {
    this.metricsObserver?.disconnect();
    this.animationFrameIds.forEach((frameId) => cancelAnimationFrame(frameId));
  }

  setLanguage(language: LanguageCode): void {
    if (this.currentLanguage === language) {
      return;
    }

    this.currentLanguage = language;
    this.translate.use(language);
    this.document.documentElement.lang = language;
  }

  openContactModal(): void {
    this.isContactModalOpen = true;
    this.hasTriedToSubmitContact = false;
  }

  closeContactModal(): void {
    this.isContactModalOpen = false;
  }

  submitContactForm(): void {
    this.hasTriedToSubmitContact = true;
    if (!this.isContactFormValid()) {
      return;
    }

    const subject = this.translate.instant('contactModal.emailSubject');
    const bodyLines = [
      `${this.translate.instant('contactModal.nameLabel')}: ${this.contactForm.name.trim()}`,
      `${this.translate.instant('contactModal.emailLabel')}: ${this.contactForm.email.trim()}`,
      `${this.translate.instant('contactModal.phoneLabel')}: ${this.contactForm.phone.trim()}`,
      '',
      `${this.translate.instant('contactModal.messageLabel')}:`,
      this.contactForm.message.trim()
    ];

    const mailtoParams = new URLSearchParams({
      subject,
      body: bodyLines.join('\n')
    });

    this.document.location.href = `mailto:${this.contactEmail}?${mailtoParams.toString()}`;
    this.resetContactForm();
    this.closeContactModal();
  }

  isFieldInvalid(field: keyof ContactFormData): boolean {
    if (!this.hasTriedToSubmitContact) {
      return false;
    }

    const value = this.contactForm[field]?.trim() ?? '';
    if (!value) {
      return true;
    }

    if (field === 'email') {
      return !this.isEmailValid(value);
    }

    return false;
  }

  scrollToSection(sectionId: string, event?: Event): void {
    event?.preventDefault();
    const section = this.document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private isContactFormValid(): boolean {
    const { name, email, phone, message } = this.contactForm;
    return Boolean(
      name.trim() &&
      this.isEmailValid(email.trim()) &&
      phone.trim() &&
      message.trim()
    );
  }

  private isEmailValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private resetContactForm(): void {
    this.contactForm = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
    this.hasTriedToSubmitContact = false;
  }

  private startCounterAnimations(): void {
    this.metrics.forEach((metric) => {
      const animationDurationMs = 1300;
      const startTime = performance.now();

      const tick = (now: number): void => {
        const progress = Math.min((now - startTime) / animationDurationMs, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        this.animatedStats[metric.key] = Math.round(metric.target * easedProgress);

        if (progress < 1) {
          const frameId = requestAnimationFrame(tick);
          this.animationFrameIds.push(frameId);
        }
      };

      const frameId = requestAnimationFrame(tick);
      this.animationFrameIds.push(frameId);
    });
  }
}
