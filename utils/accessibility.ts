// 可访问性工具函数 - 2025-01-27

/**
 * 管理焦点 - 将焦点移到指定元素
 */
export function focusElement(element: HTMLElement | null) {
  if (element) {
    element.focus();
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/**
 * 管理键盘导航
 */
export function handleKeyboardNavigation(
  event: React.KeyboardEvent,
  options: {
    onEnter?: () => void;
    onEscape?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
  }
) {
  switch (event.key) {
    case 'Enter':
    case ' ':
      if (options.onEnter) {
        event.preventDefault();
        options.onEnter();
      }
      break;
    case 'Escape':
      if (options.onEscape) {
        event.preventDefault();
        options.onEscape();
      }
      break;
    case 'ArrowUp':
      if (options.onArrowUp) {
        event.preventDefault();
        options.onArrowUp();
      }
      break;
    case 'ArrowDown':
      if (options.onArrowDown) {
        event.preventDefault();
        options.onArrowDown();
      }
      break;
    case 'ArrowLeft':
      if (options.onArrowLeft) {
        event.preventDefault();
        options.onArrowLeft();
      }
      break;
    case 'ArrowRight':
      if (options.onArrowRight) {
        event.preventDefault();
        options.onArrowRight();
      }
      break;
  }
}

/**
 * 检查颜色对比度是否符合 WCAG 标准
 * @param color1 颜色1 (hex)
 * @param color2 颜色2 (hex)
 * @param level WCAG 级别 ('AA' | 'AAA')
 * @returns 是否通过
 */
export function checkColorContrast(
  color1: string,
  color2: string,
  level: 'AA' | 'AAA' = 'AA'
): boolean {
  const getLuminance = (hex: string): number => {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;
    
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const contrast = (lighter + 0.05) / (darker + 0.05);

  // WCAG AA: 4.5:1 (正常文本), 3:1 (大文本)
  // WCAG AAA: 7:1 (正常文本), 4.5:1 (大文本)
  const thresholds = {
    AA: { normal: 4.5, large: 3 },
    AAA: { normal: 7, large: 4.5 },
  };

  return contrast >= thresholds[level].normal;
}

/**
 * 为元素添加可访问性属性
 */
export function addA11yAttributes(
  element: HTMLElement,
  attributes: Record<string, string>
) {
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

