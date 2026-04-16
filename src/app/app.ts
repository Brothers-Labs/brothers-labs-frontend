import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  QueryList,
  ViewChildren,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AnalyticsService } from './core/analytics.service';

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

interface ParticleItem {
  readonly x: string;
  readonly y: string;
  readonly size: string;
  readonly duration: string;
  readonly delay: string;
}

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    A11yModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit, OnDestroy {
  @ViewChildren('revealEl', { read: ElementRef })
  private revealElements?: QueryList<ElementRef<HTMLElement>>;

  readonly companyName = 'Brothers Labs';
  readonly availableLanguages: ReadonlyArray<LanguageCode> = ['pt', 'en'];
  readonly whatsappUrl = 'https://wa.me/5547997716565';
  readonly githubProfileUrl = 'https://github.com/Brothers-Labs';
  readonly contactEmail = 'pf.souza15@gmail.com';
  readonly currentYear = new Date().getFullYear();
  readonly particles: ReadonlyArray<ParticleItem> = [
    { x: '6%', y: '12%', size: '6px', duration: '14s', delay: '0s' },
    { x: '14%', y: '28%', size: '4px', duration: '18s', delay: '1.3s' },
    { x: '22%', y: '8%', size: '5px', duration: '16s', delay: '2.2s' },
    { x: '31%', y: '24%', size: '7px', duration: '20s', delay: '0.8s' },
    { x: '39%', y: '10%', size: '4px', duration: '15s', delay: '2.8s' },
    { x: '48%', y: '30%', size: '6px', duration: '22s', delay: '1.5s' },
    { x: '56%', y: '14%', size: '5px', duration: '17s', delay: '0.4s' },
    { x: '64%', y: '27%', size: '7px', duration: '21s', delay: '2.4s' },
    { x: '72%', y: '9%', size: '4px', duration: '16s', delay: '1.1s' },
    { x: '79%', y: '22%', size: '5px', duration: '19s', delay: '2.9s' },
    { x: '86%', y: '11%', size: '6px', duration: '18s', delay: '0.6s' },
    { x: '93%', y: '26%', size: '4px', duration: '15s', delay: '2.1s' }
  ];

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

  readonly technologies: ReadonlyArray<TechnologyItem> = [
    { nameKey: 'technologies.items.angular.name', categoryKey: 'technologies.items.angular.category' },
    { nameKey: 'technologies.items.typescript.name', categoryKey: 'technologies.items.typescript.category' },
    { nameKey: 'technologies.items.react.name', categoryKey: 'technologies.items.react.category' },
    { nameKey: 'technologies.items.node.name', categoryKey: 'technologies.items.node.category' },
    { nameKey: 'technologies.items.ai.name', categoryKey: 'technologies.items.ai.category' },
    { nameKey: 'technologies.items.apps.name', categoryKey: 'technologies.items.apps.category' },
    { nameKey: 'technologies.items.chatbot.name', categoryKey: 'technologies.items.chatbot.category' },
    { nameKey: 'technologies.items.database.name', categoryKey: 'technologies.items.database.category' },
    { nameKey: 'technologies.items.postgresql.name', categoryKey: 'technologies.items.postgresql.category' },
    { nameKey: 'technologies.items.mongodb.name', categoryKey: 'technologies.items.mongodb.category' },
    { nameKey: 'technologies.items.apis.name', categoryKey: 'technologies.items.apis.category' },
    { nameKey: 'technologies.items.html.name', categoryKey: 'technologies.items.html.category' },
    { nameKey: 'technologies.items.css.name', categoryKey: 'technologies.items.css.category' },
    { nameKey: 'technologies.items.architecture.name', categoryKey: 'technologies.items.architecture.category' }
  ];

  isHeaderScrolled = false;
  isContactModalOpen = false;
  isMobileMenuOpen = false;
  hasTriedToSubmitContact = false;
  isUltraPremiumDesktop = false;
  currentLanguage: LanguageCode = 'pt';

  contactForm: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  private readonly languageStorageKey = 'brothers_labs_lang';
  private readonly document = inject(DOCUMENT);
  private readonly translate = inject(TranslateService);
  private readonly analytics = inject(AnalyticsService);
  private revealObserver?: IntersectionObserver;
  private previousContactFocusElement: HTMLElement | null = null;
  private previousMobileMenuFocusElement: HTMLElement | null = null;

  constructor() {
    this.translate.addLangs(this.availableLanguages as string[]);
    this.translate.setDefaultLang('pt');

    const savedLanguage = this.readSavedLanguage();
    const browserLanguage = this.translate.getBrowserLang();
    const normalizedLanguage: LanguageCode = savedLanguage ?? (browserLanguage === 'en' ? 'en' : 'pt');

    this.currentLanguage = normalizedLanguage;
    this.translate.use(normalizedLanguage);
    this.document.documentElement.lang = normalizedLanguage;
    this.updateUltraPremiumMode();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isHeaderScrolled = window.scrollY > 16;
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateUltraPremiumMode();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isContactModalOpen) {
      this.closeContactModal();
      return;
    }

    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  ngAfterViewInit(): void {
    this.initRevealObserver();

    this.revealElements?.changes.subscribe(() => {
      this.initRevealObserver();
    });
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
    this.document.body.style.overflow = '';
  }

  setLanguage(language: LanguageCode): void {
    if (this.currentLanguage === language) {
      if (this.isMobileMenuOpen) {
        this.closeMobileMenu();
      }
      return;
    }

    this.currentLanguage = language;
    this.translate.use(language);
    this.document.documentElement.lang = language;
    this.saveLanguagePreference(language);

    this.analytics.trackEvent('language_change', {
      language
    });

    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  trackCtaClick(origin: string): void {
    this.analytics.trackEvent('click_cta', { origin, language: this.currentLanguage });
  }

  openContactModal(origin: string): void {
    this.trackCtaClick(origin);
    this.isContactModalOpen = true;
    this.hasTriedToSubmitContact = false;
    this.previousContactFocusElement = this.document.activeElement as HTMLElement;
    this.syncBodyScrollState();

    this.analytics.trackEvent('open_modal', {
      modal: 'contact',
      origin,
      language: this.currentLanguage,
      funnel_step: 'lead_intent'
    });
  }

  closeContactModal(): void {
    this.isContactModalOpen = false;
    this.syncBodyScrollState();
    this.previousContactFocusElement?.focus();
  }

  submitContactForm(): void {
    this.hasTriedToSubmitContact = true;
    if (!this.isContactFormValid()) {
      this.analytics.trackEvent('form_validation_error', {
        form: 'contact',
        language: this.currentLanguage
      });
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

    this.analytics.trackEvent('submit_contact', {
      method: 'mailto',
      language: this.currentLanguage,
      funnel_step: 'lead_submit'
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
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }

    const section = this.document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onInteractiveMove(event: MouseEvent): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const element = event.currentTarget as HTMLElement | null;
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    element.style.setProperty('--mx', `${x.toFixed(3)}`);
    element.style.setProperty('--my', `${y.toFixed(3)}`);
  }

  onInteractiveLeave(event: MouseEvent): void {
    const element = event.currentTarget as HTMLElement | null;
    if (!element) {
      return;
    }

    element.style.setProperty('--mx', '0.5');
    element.style.setProperty('--my', '0.5');
  }

  getColumnStagger(index: number, columns: number): number {
    return index % columns;
  }

  openMobileMenu(): void {
    if (this.isMobileMenuOpen) {
      return;
    }

    this.previousMobileMenuFocusElement = this.document.activeElement as HTMLElement;
    this.isMobileMenuOpen = true;
    this.syncBodyScrollState();
  }

  closeMobileMenu(): void {
    if (!this.isMobileMenuOpen) {
      return;
    }

    this.isMobileMenuOpen = false;
    this.syncBodyScrollState();
    this.previousMobileMenuFocusElement?.focus();
  }

  navigateFromMobileMenu(sectionId: string): void {
    this.scrollToSection(sectionId);
  }

  openContactFromMobileMenu(): void {
    this.closeMobileMenu();
    this.openContactModal('mobile_menu');
  }

  private initRevealObserver(): void {
    this.revealObserver?.disconnect();

    if (!this.revealElements?.length) {
      return;
    }

    this.revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add('is-visible');
            this.revealObserver?.unobserve(target);
          }
        });
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.2
      }
    );

    this.revealElements.forEach((elementRef) => {
      this.revealObserver?.observe(elementRef.nativeElement);
    });
  }

  private isContactFormValid(): boolean {
    const { name, email, phone, message } = this.contactForm;
    return Boolean(name.trim() && this.isEmailValid(email.trim()) && phone.trim() && message.trim());
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

  private readSavedLanguage(): LanguageCode | null {
    try {
      const saved = localStorage.getItem(this.languageStorageKey);
      return saved === 'pt' || saved === 'en' ? saved : null;
    } catch {
      return null;
    }
  }

  private saveLanguagePreference(language: LanguageCode): void {
    try {
      localStorage.setItem(this.languageStorageKey, language);
    } catch {
      // Storage can be unavailable in private browsing or restricted environments.
    }
  }

  private syncBodyScrollState(): void {
    this.document.body.style.overflow = this.isContactModalOpen || this.isMobileMenuOpen ? 'hidden' : '';
  }

  private updateUltraPremiumMode(): void {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      this.isUltraPremiumDesktop = false;
      return;
    }

    this.isUltraPremiumDesktop = window.matchMedia(
      '(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
    ).matches;
  }
}
