# TASK_DECOMPOSITION.md - Lab 3 (React 19)

> Cách dùng: làm lần lượt từng task. Xong task nào thì tick `[x]`.
> Mỗi nhóm task kết thúc bằng 1 commit (khớp message đề yêu cầu).
> Với mỗi task: (1) tự viết contract, (2) nhờ AI đúng 1 mảnh nhỏ kèm `project-rules.md`, (3) kiểm chứng, (4) commit.

---

## BLOCK 1: Khởi tạo (phút 0-40)

- [ ] T0.1: `npm create vite@latest` chọn React (JavaScript), kiểm tra `main.jsx` dùng `createRoot` + `StrictMode`
- [ ] T0.2: Dọn file mẫu của Vite (logo, App.css), tạo thư mục `src/components`, `src/homeworks`
- [ ] T0.3: Thêm `project-rules.md`, `TASK_DECOMPOSITION.md`, tạo `AI_FAILURE_AUDIT.md` (tiêu đề rỗng)
- [ ] T0.4: Chạy `npm run dev`, xác nhận Console không có warning

**Commit:** `chore: init react19 vite & rules`

---

## EX 1: DeveloperCard + SkillBadge (phút 40-75, 35 phút)

### Contract (tự viết trước khi nhờ AI)

```js
/**
 * DeveloperCard
 * Props (đều có default ES6, KHÔNG defaultProps):
 *   fullName: string
 * 	 role: string
 *   avatarUrl: string (https only)
 *   metrics: Record<string, number>   // render bằng <dl>
 *   skills: Array<{ id: string, name: string, tier: string }>
 * State: không có (component thuần)
 * Cấm: <div>, <h1> lặp lại, inline style, http://
 */
```

### Danh sách task

- [ ] T1.1: Tạo `DeveloperCard.jsx` khung `<article aria-labelledby="dev-heading">`
- [ ] T1.2: Phần `<header>`: `<img>` (HTTPS, `width`/`height`, `alt`) + `<hgroup>` với `<h2 id="dev-heading">` và `<p>` vai trò
- [ ] T1.3: Fallback khi ảnh lỗi: hiển thị chữ cái đầu (initials)
- [ ] T1.4: `<dl>` metrics: `Object.entries(metrics).map(...)` với `<Fragment key={k}><dt/><dd/></Fragment>`
- [ ] T1.5: Tách `SkillBadge` (nhận `{ name, tier }`), danh sách `<ul aria-label="Engineered Skills">` với `key={s.id}`
- [ ] T1.6: Gắn vào `App.jsx`, kiểm tra render
- [ ] **Commit 1:** `feat(ex1): implement semantic DeveloperCard and SkillBadge`
- [ ] T1.7: Tạo `DeveloperCard.module.css` với CSS Custom Properties (màu, khoảng cách)
- [ ] T1.8: Chuyển class sang `styles.card`, `styles.metrics`, `styles.skills`
- [ ] T1.9: Responsive: kiểm tra 375px (iPhone SE), không cuộn ngang
- [ ] **Commit 2:** `style(ex1): add responsive 375px CSS module`

### Checkpoint 1 (phút 75)

```bash
grep -n '<div' src/components/DeveloperCard.jsx     # phải rỗng
grep -n 'http://' src/components/DeveloperCard.jsx  # phải rỗng
```

- [ ] Elements > Accessibility Tree: `article` > header + dl + list
- [ ] Device Toolbar 375px: không cuộn ngang
- [ ] `git log --oneline`: 2 commit ex1 đúng message

---

## EX 2: ScientistDirectory (phút 75-120, 45 phút)

### Contract (tự viết trước khi nhờ AI)

```js
/**
 * ScientistDirectory
 * Props:  initialData: Array<{ id, name, age, iq }>
 * State (CHỈ dữ liệu gốc):
 *   people  : Array
 *   query   : string
 *   minIq   : number
 *   sortBy  : 'iq-desc' | 'age-asc'
 * Derived (KHÔNG phải state):
 *   visible = people.filter(tên khớp && iq >= minIq).toSorted(...)
 * Cấm: useEffect cho lọc/sắp xếp, mutate state, input thiếu label
 */
```

### Danh sách task

- [ ] T2.1: Tạo mảng `SMART_PEOPLE` 6 người (Goethe, Einstein, da Vinci, Newton, Maxwell, Sidis), mỗi người có `id` ổn định (`sp-1`...)
- [ ] T2.2: Render danh sách tĩnh `<ul>` với `key={p.id}`
- [ ] **Commit 1:** `feat(ex2): normalize smartPeople schema with stable IDs`
- [ ] T2.3: State `query` + ô `<input type="search">` có `<label htmlFor>` (`useId`)
- [ ] T2.4: Lọc tên không phân biệt hoa thường (`toLowerCase().includes(...)`) ngay trong render
- [ ] T2.5: State `minIq` + `<input type="number">`, đọc bằng `valueAsNumber` (xử lý `Number.isNaN`)
- [ ] T2.6: State `sortBy` + `<select>` có label, sắp xếp bằng `.toSorted()`
- [ ] **Commit 2:** `feat(ex2): add search, IQ filter & toSorted`
- [ ] T2.7: Nút Delete mỗi dòng (`type="button"`), `setPeople((prev) => prev.filter(p => p.id !== id))`
- [ ] T2.8: Nút Reset khôi phục snapshot `SMART_PEOPLE`
- [ ] T2.9: `<output role="status" aria-live="polite">Found {visible.length} pioneers</output>`
- [ ] **Commit 3:** `feat(ex2): add delete/reset & live status`

### Checkpoint 2 (phút 120)

- [ ] Code không có `useEffect` nào trong file này
- [ ] React DevTools Profiler: gõ 1 ký tự = đúng 1 lần render
- [ ] Xóa "Johann Goethe": focus và key của các dòng còn lại không bị xáo trộn
- [ ] Accessibility: 100% input có label liên kết
- [ ] `git log --oneline`: 3 commit ex2 đúng message

---

## EX 3: PubgMatchTelemetry (phút 120-155, 35 phút)

### Contract (tự viết trước khi nhờ AI)

```js
/**
 * PubgMatchTelemetry
 * Props: squadId: 'ces' | 'te' | 'ge' (default 'te')
 * State:
 *   view      : { status: 'IDLE'|'LOADING'|'SUCCESS'|'ERROR', data, error }
 *   retryTick : number   // tăng 1 để chạy lại effect
 * Effect deps: [squadId, retryTick]
 * Cleanup: controller.abort()
 * Cấm: window.alert, boolean soup, hiện lỗi khi AbortError
 */
```

### Danh sách task

- [ ] T3.1: Tạo `PUBG_VN_SQUADS` (Cerberus Esports, The Expendables, Genius Esports) và hàm giả lập `fetchKraftonPubgTelemetry(squadId, { signal })` có delay
- [ ] T3.2: Giả lập mất gói tin 35% (reject ngẫu nhiên) và tôn trọng `signal` (reject `AbortError` khi bị hủy)
- [ ] T3.3: State machine `view` + `useEffect` gọi fetch, cleanup `controller.abort()`
- [ ] T3.4: Trong `.catch`: bỏ qua `AbortError`, còn lại set `ERROR`
- [ ] T3.5: Bộ chọn đội (3 nút `type="button"`) để đổi `squadId`
- [ ] T3.6: Render trạng thái SUCCESS trong `<article aria-live="polite">`
- [ ] **Commit 1:** `feat(ex3): implement PUBG VN 4-state telemetry & AbortController`
- [ ] T3.7: Skeleton 220px khi LOADING (`aria-busy="true"`), đúng kích thước để CLS = 0
- [ ] T3.8: Trạng thái ERROR: `<section role="alert">` + nút "Reconnect Satellite" tăng `retryTick`
- [ ] **Commit 2:** `feat(ex3): add skeleton UI & retry alert`

### Checkpoint 3 (phút 155)

- [ ] DevTools > Network > Slow 3G: skeleton hiển thị, không giật layout (CLS 0.00)
- [ ] Bấm nhanh CES > TE > GE: Network thấy các request cũ `(canceled)`, không hiện lỗi giả
- [ ] Khi lỗi: thấy khối `role="alert"`, bấm Reconnect chạy lại được
- [ ] Không còn `window.alert` trong code (`grep -n 'alert(' src`)

---

## BLOCK 5: Chuẩn bị bảo vệ (phút 155-180)

- [ ] `AI_FAILURE_AUDIT.md`: ghi tối thiểu 3 lỗi AI thật (prompt, code AI, lỗi, bằng chứng DevTools, cách sửa + commit)
- [ ] Luyện 3 tình huống: (A) Watchlist không dùng useEffect, (B) auto-polling 5s + Pause + cleanup, (C) nâng `selectedId` lên `<App />`
- [ ] Đóng mọi công cụ AI trước khi gọi giảng viên

---

## Bảng tổng hợp commit

| # | Message | Thuộc |
|---|---|---|
| 1 | `chore: init react19 vite & rules` | Block 1 |
| 2 | `feat(ex1): implement semantic DeveloperCard and SkillBadge` | Ex 1 |
| 3 | `style(ex1): add responsive 375px CSS module` | Ex 1 |
| 4 | `feat(ex2): normalize smartPeople schema with stable IDs` | Ex 2 |
| 5 | `feat(ex2): add search, IQ filter & toSorted` | Ex 2 |
| 6 | `feat(ex2): add delete/reset & live status` | Ex 2 |
| 7 | `feat(ex3): implement PUBG VN 4-state telemetry & AbortController` | Ex 3 |
| 8 | `feat(ex3): add skeleton UI & retry alert` | Ex 3 |

Tổng 8 commit trong lớp, đã đạt mức tối thiểu 6-8 của slide. Các commit sửa lỗi nhỏ (`fix:`) hoặc `docs: add AI_FAILURE_AUDIT` có thể thêm sau để lịch sử tự nhiên hơn.
