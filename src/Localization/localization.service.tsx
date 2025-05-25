export type LocalizationLang = "UA" | "EN";

const translations = {
  UA: {
    welcome_message:
      "MunitS є повністю безкоштовним та з відкритим кодом. Дізнайтеся більше деталей нижче.",
    sub_logo_message: "Безпечно. Масштабовано. Для вас.",
    start_now: "Почати зараз",
    free_access: "Безкоштовний доступ до MunitS Hub.",
    experience_storage: "Спробуйте хостинг сховища.",
    explore_open_source: "Дослідити відкритий код",
    full_access: "Повний доступ до коду.",
    make_it_work: "Налаштуйте під себе.",
    all_rights_reserved: "© 2025 MunitS. Усі права захищені.",
    login: "Увійти",
    email: "Електронна пошта",
    password: "Пароль",
    submit: "Надіслати",
    sign_up: "Зареєструватися",
    log_out: "Вийти",
    dashboard: "Панель керування",
    metrics: "Метрики",
    buckets: "Бакети",
    select_a_bucket: "Виберіть бакет",
    select_buckets_to_see_charts: "Виберіть бакет для перегляду графіків.",
    bucket_interactive: "Бакет - Інтерактивний",
    showing_total_operations_metrics:
      "Відображення загальної метрики операцій за останні 3 місяці",
    last_3_months: "Останні 3 місяці",
    last_30_days: "Останні 30 днів",
    last_7_days: "Останні 7 днів",
    operations: "Операції",
    amount: "Кількість",
    munits_object_storage: "MunitS Об'єктне Сховище",
    overview: "Огляд",
    high_performance_storage:
      "Високопродуктивне сховище для файлів та об'єктів без плати за вихідний трафік.",
    munits_source_code: "Вихідний код MunitS",
    search_buckets: "Пошук бакетів",
    add_bucket: "Додати бакет",
    loading: "Завантаження",
    you_have_no_buckets_created:
      "У вас немає створених бакетів. Додайте один, щоб почати роботу.",
    size: "Розмір",
    objects: "Об'єкти",
    create_a_bucket: "Створити бакет",
    maximum_bucket_name: "Максимальна довжина назви бакета - 63 символи.",
    invalid_bucket_name: "Невірна назва бакета.",
    bucket_with_name_exists: "Бакет з такою назвою вже існує.",
    get_started_by_creating_new_bucket:
      "Почніть роботу, створивши новий порожній бакет. Ви зможете додавати дані до бакета через панель керування.",
    bucket_name: "Назва бакета",
    bucket_name_is_permanent: "Назва бакета є постійною та незмінною.",
    location: "Розташування",
    default: "За замовчуванням",
    we_have_chosen:
      "Ми обрали Східну Європу для розміщення вашого бакета. Вкажіть інше розташування, якщо потрібно.",
    versioning: "Версійність",
    not_versioned_bucket: "Бакет без версійності",
    only_one_version:
      "Зберігається лише одна версія кожного об'єкта. При перезаписі об'єкта попередня версія втрачається.",
    versioning_enabled: "Версійність увімкнена",
    each_object_has_fixed: "Кожен об'єкт має фіксовану кількість версій.",
    number_of_versions: "Кількість версій",
    by_default_buckets_are_not_publicly_accessible:
      "За замовчуванням бакети не є публічно доступними. Ви можете отримати доступ до об'єктів у бакеті, прив'язавши бакет до Worker або використовуючи API. Доступ до бакета можна змінити на публічний у будь-який момент.",
    cancel: "Скасувати",
    create: "Створити",
    objects_count: "Кількість об'єктів",
    versions_limit: "Ліміт версій",
    yes: "Так",
    no: "Ні",
    settings: "Налаштування",
    delete_bucket: "Видалити бакет",
    delete: "Видалити",
    to_delete_this_bucket: "Щоб видалити цей бакет, введіть",
    object: "Об'єкт",
    folder: "Папка",
    refresh: "Оновити",
    upload: "Завантажити",
    no_objects_found:
      "Об'єкти не знайдені. Завантажте щось, щоб почати роботу.",
    storage_class: "Клас сховища",
    type: "Тип",
    next: "Далі",
    previous: "Назад",
    no_tags_attached: "Теги відсутні.",
    no_custom_metadata_attached: "Додаткові метадані відсутні.",
    status: "Статус",
    content_type: "Тип вмісту",
    version_initiated_at: "Версія створена",
    created_at: "Створено",
    versions: "Версії",
  },
  EN: {
    welcome_message:
      "MunitS is completely free and open source. Explore below for more details.",
    sub_logo_message: "Secure. Scalable. Yours.",
    start_now: "Start Now",
    free_access: "Free access to MunitS Hub.",
    experience_storage: "Experience hosted storage.",
    explore_open_source: "Explore Open Source",
    full_access: "Full access to code.",
    make_it_work: "Make it work for you.",
    all_rights_reserved: "© 2025 MunitS. All rights reserved.",
    login: "Login",
    email: "Email",
    password: "Password",
    submit: "Submit",
    sign_up: "Sign Up",
    log_out: "Log out",
    dashboard: "Dashboard",
    metrics: "Metrics",
    buckets: "Buckets",
    select_a_bucket: "Select a bucket",
    select_buckets_to_see_charts: "Select bucket to see charts.",
    bucket_interactive: "Bucket - Interactive",
    showing_total_operations_metrics:
      "Showing total operations metrics for the last 3 months",
    last_3_months: "Last 3 months",
    last_30_days: "Last 30 days",
    last_7_days: "Last 7 days",
    operations: "Operations",
    amount: "Amount",
    munits_object_storage: "MunitS Object Storage",
    overview: "Overview",
    high_performance_storage:
      "High-performance storage for files and objects with zero egress charges.",
    munits_source_code: "MunitS source code",
    search_buckets: "Search buckets",
    add_bucket: "Add bucket",
    loading: "Loading",
    you_have_no_buckets_created:
      "You have no buckets created. Add one to start working with.",
    size: "Size",
    objects: "Objects",
    create_a_bucket: "Create a bucket",
    maximum_bucket_name: "Maximum bucket name is 63 symbols.",
    invalid_bucket_name: "Invalid bucket name.",
    bucket_with_name_exists: "Bucket with this name already exists.",
    get_started_by_creating_new_bucket:
      " Get started by creating a new empty bucket. You'll be able to add data to your bucket using the dashboard",
    bucket_name: "Bucket name",
    bucket_name_is_permanent: "Bucket name is permanent and unchangeable.",
    location: "Location",
    default: "Default",
    we_have_chosen:
      "We have chosen to place your bucket in Eastern Europe. Provide a location hint, if you would like to use a different location.",
    versioning: "Versioning",
    not_versioned_bucket: "Not versioned bucket",
    only_one_version:
      "Only one version of each object is stored. When you overwrite an object, the previous version is lost.",
    versioning_enabled: "Versioning enabled",
    each_object_has_fixed: "Each object has fixed number of versions.",
    number_of_versions: "Number of versions",
    by_default_buckets_are_not_publicly_accessible:
      "By default buckets are not publicly accessible. You can access objects stored within your bucket by binding the bucket to a Worker or using the API. Bucket access can be changed to Public at any time.",
    cancel: "Cancel",
    create: "Create",
    objects_count: "Objects count",
    versions_limit: "Versions limit",
    yes: "Yes",
    no: "No",
    settings: "Settings",
    delete_bucket: "Delete bucket",
    delete: "Delete",
    to_delete_this_bucket: "To delete this bucket, please type",
    object: "Object",
    folder: "Folder",
    refresh: "Refresh",
    upload: "Upload",
    no_objects_found: "No objects found. Upload some to start working with.",
    storage_class: "Storage class",
    type: "Type",
    next: "Next",
    previous: "Previous",
    no_tags_attached: "No tags attached.",
    no_custom_metadata_attached: "No custom metadata attached.",
    status: "Status",
    content_type: "Content type",
    version_initiated_at: "Version initiated at",
    created_at: "Created at",
    versions: "Versions",
  },
} satisfies Record<LocalizationLang, Record<string, string>>;

class LocalizationService {
  setUserTokens(language: LocalizationLang) {
    localStorage.setItem("localization", JSON.stringify(language));
  }

  getLocalizationLanguage(): LocalizationLang {
    const value = localStorage.getItem("localization");
    if (!value) return "EN";
    try {
      const parsed = JSON.parse(value);
      if (parsed === "UA" || parsed === "EN") {
        return parsed;
      }
      return "UA";
    } catch {
      return "UA";
    }
  }

  translate(key: string): string {
    const lang = this.getLocalizationLanguage();
    return (translations[lang] as Record<string, string>)[key] || key;
  }
}

const localizationServiceInstance = new LocalizationService();
export default localizationServiceInstance;
