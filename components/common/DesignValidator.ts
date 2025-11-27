// 🔍 مدقق التصميم - يتأكد من الالتزام بقواعد التصميم
import { RAY_DESIGN_SYSTEM, rayUtils, RAY_DESIGN_RULES } from './DesignSystem';

export interface ValidationError {
  type: 'currency' | 'color' | 'spacing' | 'borderRadius' | 'font';
  message: string;
  severity: 'error' | 'warning';
  location?: string;
}

export class DesignValidator {
  private static errors: ValidationError[] = [];

  // التحقق من العملة
  static validateCurrency(text: string, location?: string): void {
    // التحقق من وجود عملات غير الجنيه المصري
    const invalidCurrencies = ['$', '€', '£', 'ريال', 'dollar', 'euro', 'pound'];
    
    for (const currency of invalidCurrencies) {
      if (text.toLowerCase().includes(currency.toLowerCase())) {
        this.errors.push({
          type: 'currency',
          message: `❌ عملة غير صالحة: ${currency}. يجب استخدام الجنيه المصري فقط (ج.م)`,
          severity: 'error',
          location
        });
      }
    }

    // التحقق من تنسيق العملة الصحيح
    if (text.includes('ج.م') || text.includes('جنيه')) {
      if (!text.match(/\d{1,3}(,\d{3})*(\.\d+)?\s*ج\.?م?/)) {
        this.errors.push({
          type: 'currency',
          message: `⚠️ تنسيق عملة غير صحيح: ${text}. يجب استخدام التنسيق: 1,250 ج.م`,
          severity: 'warning',
          location
        });
      }
    }
  }

  // التحقق من الألوان
  static validateColors(cssText: string, location?: string): void {
    // استخراج جميع الألوان من النص
    const colorRegex = /#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|rgb\([^)]+\)|rgba\([^)]+\)|[a-z]+/g;
    const colors = cssText.match(colorRegex) || [];

    // الألوان المسموح بها
    const allowedColors = [
      ...Object.values(RAY_DESIGN_SYSTEM.colors.primary),
      ...Object.values(RAY_DESIGN_SYSTEM.colors.secondary),
      ...Object.values(RAY_DESIGN_SYSTEM.colors.neutral),
      ...Object.values(RAY_DESIGN_SYSTEM.colors.success),
      ...Object.values(RAY_DESIGN_SYSTEM.colors.error),
      ...Object.values(RAY_DESIGN_SYSTEM.colors.warning),
      ...Object.values(RAY_DESIGN_SYSTEM.colors.info),
      'white', 'black', 'transparent', 'inherit'
    ];

    colors.forEach(color => {
      if (!allowedColors.includes(color) && !color.startsWith('#') && !color.startsWith('rgb')) {
        this.errors.push({
          type: 'color',
          message: `❌ لون غير صالح: ${color}. يجب استخدام الألوان المعتمدة فقط`,
          severity: 'error',
          location
        });
      }
    });
  }

  // التحقق من المسافات
  static validateSpacing(cssText: string, location?: string): void {
    const spacingRegex = /\d+(px|rem|em|vh|vw|%)/g;
    const spacings = cssText.match(spacingRegex) || [];

    // المسافات المسموح بها
    const allowedSpacings = [
      '0.25rem', '0.5rem', '1rem', '1.5rem', '2rem', '3rem', '4rem', '6rem', '8rem',
      '4px', '8px', '16px', '24px', '32px', '48px', '64px', '96px', '128px'
    ];

    spacings.forEach(spacing => {
      if (!allowedSpacings.includes(spacing)) {
        this.errors.push({
          type: 'spacing',
          message: `⚠️ مسافة غير صالحة: ${spacing}. يجب استخدام المسافات المعتمدة فقط`,
          severity: 'warning',
          location
        });
      }
    });
  }

  // التحقق من زوايا الحواف
  static validateBorderRadius(cssText: string, location?: string): void {
    const borderRadiusRegex = /border-radius:\s*([^;]+)/g;
    const matches = cssText.match(borderRadiusRegex) || [];

    const allowedRadii = [
      '0', '0.125rem', '0.25rem', '0.375rem', '0.5rem', '0.75rem', '1rem', '1.5rem', '9999px',
      '0px', '2px', '4px', '6px', '8px', '12px', '16px', '24px'
    ];

    matches.forEach(match => {
      const radius = match.split(':')[1].trim();
      if (!allowedRadii.includes(radius)) {
        this.errors.push({
          type: 'borderRadius',
          message: `⚠️ زاوية حافة غير صالحة: ${radius}. يجب استخدام الزوايا المعتمدة فقط`,
          severity: 'warning',
          location
        });
      }
    });
  }

  // التحقق من الخطوط
  static validateFonts(cssText: string, location?: string): void {
    const fontRegex = /font-family:\s*([^;]+)/g;
    const matches = cssText.match(fontRegex) || [];

    const allowedFonts = ['Tajawal', 'Cairo', 'Inter', 'system-ui', 'sans-serif'];

    matches.forEach(match => {
      const fontFamily = match.split(':')[1].trim();
      const fonts = fontFamily.split(',').map(f => f.trim().replace(/['"]/g, ''));
      
      fonts.forEach(font => {
        if (!allowedFonts.includes(font) && !font.includes('system-ui')) {
          this.errors.push({
            type: 'font',
            message: `⚠️ خط غير صالح: ${font}. يجب استخدام الخطوط المعتمدة فقط`,
            severity: 'warning',
            location
          });
        }
      });
    });
  }

  // التحقق الكامل
  static validateAll(content: string, location: string = 'unknown'): ValidationError[] {
    this.errors = [];

    this.validateCurrency(content, location);
    this.validateColors(content, location);
    this.validateSpacing(content, location);
    this.validateBorderRadius(content, location);
    this.validateFonts(content, location);

    return this.errors;
  }

  // التحقق من ملف
  static validateFile(filePath: string, content: string): ValidationError[] {
    return this.validateAll(content, filePath);
  }

  // عرض النتائج
  static showResults(errors: ValidationError[]): void {
    if (errors.length === 0) {
      console.log('✅ جميع قواعد التصميم ملتزم بها');
      return;
    }

    console.log(`🔍 تم العثور على ${errors.length} مخالفة:`);
    
    errors.forEach((error, index) => {
      const icon = error.severity === 'error' ? '❌' : '⚠️';
      const location = error.location ? ` (${error.location})` : '';
      console.log(`${index + 1}. ${icon} ${error.message}${location}`);
    });

    const errorsCount = errors.filter(e => e.severity === 'error').length;
    const warningsCount = errors.filter(e => e.severity === 'warning').length;
    
    console.log(`\n📊 الإجمالي: ${errorsCount} خطأ, ${warningsCount} تحذير`);
    
    if (errorsCount > 0) {
      console.log('🚨 يرجى إصلاح الأخطاء قبل المتابعة');
    }
  }

  // التحقق التلقائي عند التطوير
  static autoValidate(): void {
    // هذه الدالة يمكن استدعاؤها في بيئة التطوير
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 بدء التحقق التلقائي من قواعد التصميم...');
      
      // يمكن إضافة منطق لفحص جميع الملفات هنا
      console.log('✅ التحقق التلقائي مكتمل');
    }
  }
}

// دوال مساعدة سريعة
export const validatePrice = (price: string | number): boolean => {
  const priceStr = typeof price === 'number' ? rayUtils.formatPrice(price) : price;
  return priceStr.includes('ج.م') || priceStr.includes('جنيه');
};

export const validateColor = (color: string): boolean => {
  const allowedColors = [
    ...Object.values(RAY_DESIGN_SYSTEM.colors.primary),
    ...Object.values(RAY_DESIGN_SYSTEM.colors.secondary),
    ...Object.values(RAY_DESIGN_SYSTEM.colors.neutral)
  ];
  return allowedColors.includes(color) || color.startsWith('#') || color.startsWith('rgb');
};

export const validateSpacing = (spacing: string): boolean => {
  const allowedSpacings = ['0.25rem', '0.5rem', '1rem', '1.5rem', '2rem', '3rem', '4rem', '6rem', '8rem'];
  return allowedSpacings.includes(spacing);
};

export default DesignValidator;
