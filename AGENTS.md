# Developer & Agent Guidelines

Guidelines for developers and AI agents working on **CHUMTIYA DETECTOR**.

## Project Summary
- **App**: CHUMTIYA DETECTOR (Official Psychological Parody & Dost Diagnostic Engine)
- **Stack**: React 19, TypeScript, TanStack Start (Nitro SSR), Tailwind CSS v4, Lucide Icons, Canvas 2D
- **Deployment**: Vercel SSR

## Key Architectural Rules
1. **SSR Compatibility**: Keep `window` or `document` accesses gated inside `useEffect` or client-side event handlers.
2. **State Management**: Survey questions, sound synthesis (Web Audio API), and results are computed purely client-side without external DB dependencies.
3. **Canvas Generation**: The certificate generators (`ChumtiyaCertificate` and `FriendDecreeCertificate`) render 1400x980 high-DPI canvases for official downloads. Keep typography and layout responsive.
4. **Clean Commits**: Keep commit messages semantic (`feat:`, `fix:`, `docs:`, `chore:`).
