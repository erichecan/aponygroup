// API 工具函数 - 表单提交、API 请求
// 时间戳：2025-01-27

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * 提交联系表单
 * @param formData 表单数据
 * @returns Promise<ApiResponse>
 */
export async function submitContactForm(formData: ContactFormData): Promise<ApiResponse> {
  try {
    // TODO: 替换为实际的 API 端点
    const API_ENDPOINT = process.env.VITE_API_ENDPOINT || '/api/contact';
    
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
      message: 'Message sent successfully',
    };
  } catch (error) {
    console.error('Failed to submit contact form:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send message',
    };
  }
}

/**
 * 追踪订单
 * @param trackingId 追踪 ID
 * @returns Promise<ApiResponse>
 */
export async function trackOrder(trackingId: string): Promise<ApiResponse> {
  try {
    // TODO: 替换为实际的物流追踪 API
    const API_ENDPOINT = process.env.VITE_TRACKING_API_ENDPOINT || '/api/tracking';
    
    const response = await fetch(`${API_ENDPOINT}/${encodeURIComponent(trackingId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Failed to track order:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to track order',
    };
  }
}

/**
 * 通用 API 请求函数
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Request failed',
    };
  }
}

